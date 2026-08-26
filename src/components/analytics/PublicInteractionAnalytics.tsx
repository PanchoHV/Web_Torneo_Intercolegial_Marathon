import { useEffect } from 'react';

import {
  trackFanAppOpen,
  trackFileDownload,
  trackOutboundClick,
} from '@/lib/analytics/gtm';
import { FAN_APP_URL } from '@/lib/constants/links';

const FAN_APP_DESTINATION = new URL(FAN_APP_URL);
const DOWNLOAD_EXTENSION = /\.([a-z0-9]{2,5})$/i;

function getLinkLocation(anchor: HTMLAnchorElement) {
  if (anchor.dataset.analyticsLocation) return anchor.dataset.analyticsLocation;

  const section = anchor.closest<HTMLElement>('section');
  if (section?.id) return section.id;
  if (section?.getAttribute('aria-labelledby')) return section.getAttribute('aria-labelledby')!;
  if (anchor.closest('footer')) return 'footer';

  return window.location.pathname;
}

function isFanAppDestination(url: URL) {
  return (
    url.origin === FAN_APP_DESTINATION.origin &&
    url.pathname.replace(/\/$/, '') === FAN_APP_DESTINATION.pathname.replace(/\/$/, '')
  );
}

export default function PublicInteractionAnalytics() {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;

      const anchor = event.target.closest<HTMLAnchorElement>('a[href]');
      if (!anchor) return;

      const url = new URL(anchor.href, window.location.href);
      const linkLocation = getLinkLocation(anchor);
      const fileMatch = DOWNLOAD_EXTENSION.exec(url.pathname);

      if (anchor.hasAttribute('download') || fileMatch) {
        const fileName = decodeURIComponent(url.pathname.split('/').pop() || 'download');
        trackFileDownload({
          file_name: fileName,
          file_extension: fileMatch?.[1]?.toLowerCase() || 'unknown',
          link_location: linkLocation,
        });
        return;
      }

      if (isFanAppDestination(url)) {
        trackFanAppOpen({ cta_location: linkLocation, destination: FAN_APP_URL });
        return;
      }

      if (url.origin !== window.location.origin) {
        trackOutboundClick({ link_domain: url.hostname, link_location: linkLocation });
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return null;
}
