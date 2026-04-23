import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: string | HTMLElement,
        options: Record<string, unknown>
      ) => string;
      reset: (widgetId: string) => void;
      execute: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
    __turnstileScriptPromise?: Promise<void>;
  }
}

export type TurnstileChallengeHandle = {
  execute: () => void;
  reset: () => void;
};

type TurnstileChallengeProps = {
  siteKey: string;
  onVerify: (token: string) => void;
  onError: () => void;
  onExpire: () => void;
  onReady?: () => void;
};

function loadTurnstileScript() {
  if (window.turnstile) {
    return Promise.resolve();
  }

  if (window.__turnstileScriptPromise) {
    return window.__turnstileScriptPromise;
  }

  window.__turnstileScriptPromise = new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      'script[src^="https://challenges.cloudflare.com/turnstile/v0/api.js"]'
    );

    if (existing) {
      existing.addEventListener('load', () => resolve(), { once: true });
      existing.addEventListener('error', () => reject(new Error('No se pudo cargar Turnstile.')), {
        once: true,
      });
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('No se pudo cargar Turnstile.'));
    document.head.appendChild(script);
  });

  return window.__turnstileScriptPromise;
}

const TurnstileChallenge = forwardRef<TurnstileChallengeHandle, TurnstileChallengeProps>(
  ({ siteKey, onVerify, onError, onExpire, onReady }, ref) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const widgetIdRef = useRef<string | null>(null);
    const [loadError, setLoadError] = useState<string | null>(null);

    useImperativeHandle(ref, () => ({
      execute: () => {
        if (widgetIdRef.current && window.turnstile) {
          window.turnstile.execute(widgetIdRef.current);
        }
      },
      reset: () => {
        if (widgetIdRef.current && window.turnstile) {
          window.turnstile.reset(widgetIdRef.current);
        }
      },
    }));

    useEffect(() => {
      let cancelled = false;

      const mountWidget = async () => {
        try {
          await loadTurnstileScript();

          if (
            cancelled ||
            !containerRef.current ||
            !window.turnstile ||
            widgetIdRef.current
          ) {
            return;
          }

          widgetIdRef.current = window.turnstile.render(containerRef.current, {
            sitekey: siteKey,
            action: 'registration_submit',
            appearance: 'interaction-only',
            execution: 'execute',
            theme: 'light',
            size: 'flexible',
            callback: (token: string) => {
              onVerify(token);
            },
            'error-callback': () => {
              onError();
            },
            'expired-callback': () => {
              onExpire();
            },
            'timeout-callback': () => {
              onExpire();
            },
          });
          onReady?.();
        } catch (error) {
          if (!cancelled) {
            setLoadError(error instanceof Error ? error.message : 'No se pudo cargar Turnstile.');
          }
        }
      };

      void mountWidget();

      return () => {
        cancelled = true;
        if (widgetIdRef.current && window.turnstile) {
          window.turnstile.remove(widgetIdRef.current);
          widgetIdRef.current = null;
        }
      };
    }, [onError, onExpire, onReady, onVerify, siteKey]);

    return (
      <div className="grid gap-2">
        <div ref={containerRef} className="min-h-[65px]" />
        {loadError && (
          <p className="text-xs font-semibold text-red-600">{loadError}</p>
        )}
      </div>
    );
  }
);

TurnstileChallenge.displayName = 'TurnstileChallenge';

export default TurnstileChallenge;
