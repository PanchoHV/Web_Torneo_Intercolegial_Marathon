import FanAppFaqSection from '@/sections/fan-app/FanAppFaqSection';
import FanAppFeaturesSection from '@/sections/fan-app/FanAppFeaturesSection';
import FanAppHeroSection from '@/sections/fan-app/FanAppHeroSection';
import FanAppInstallSection from '@/sections/fan-app/FanAppInstallSection';
import FanAppScreensSection from '@/sections/fan-app/FanAppScreensSection';

export default function FanAppPage() {
  return (
    <div data-page="fan-app" className="relative overflow-hidden bg-[#031426] text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(226,27,45,0.18),transparent_22%),radial-gradient(circle_at_top_right,rgba(0,80,164,0.22),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.03)_0%,rgba(255,255,255,0)_14%,rgba(255,255,255,0.02)_100%)]"
      />

      <div className="relative">
        <FanAppHeroSection />

        {/*
          Los cuatro modulos comparten un unico plano de papel. El tratamiento
          es el mismo que ya usaba el FAQ (master): se aplica aqui una sola vez
          para que Funciones -> Instalacion -> Capturas -> FAQ se lean continuos.
        */}
        <div
          className="relative overflow-hidden"
          style={{
            backgroundColor: '#F4F8FC',
            backgroundImage:
              "linear-gradient(180deg, rgba(255,255,255,0.26) 0%, rgba(255,255,255,0) 24%), url('https://pub-dc06325214ac4e9a8959030cf5f65654.r2.dev/optimized-paper-background.webp')",
            backgroundRepeat: 'repeat, repeat',
            backgroundPosition: 'center top, center top',
            backgroundSize: 'auto, 700px auto',
          }}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(226,27,45,0.07),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(0,80,164,0.05),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.14)_0%,rgba(255,255,255,0)_22%)]"
          />

          <div className="relative">
            <FanAppFeaturesSection />
            <FanAppInstallSection />
            <FanAppScreensSection />
            <FanAppFaqSection />
          </div>
        </div>
      </div>
    </div>
  );
}
