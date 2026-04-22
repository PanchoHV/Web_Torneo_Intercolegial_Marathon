import { useState } from 'react';

import RegistrationBenefits from '@/components/registrations/RegistrationBenefits';
import RegistrationForm from '@/components/registrations/RegistrationForm';
import RegistrationHero from '@/components/registrations/RegistrationHero';
import RegistrationIntro from '@/components/registrations/RegistrationIntro';
import RegistrationPrivacy from '@/components/registrations/RegistrationPrivacy';
import RegistrationSuccess from '@/components/registrations/RegistrationSuccess';
import type { RegistrationResult } from '@/types/registration';

export default function InscripcionesPage() {
  const [registrationResult, setRegistrationResult] = useState<RegistrationResult | null>(null);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-marathon-cream px-3 py-4 sm:px-6 sm:py-6 lg:px-8">
      <img
        src="/inscripciones-page-background.webp"
        alt=""
        className="pointer-events-none fixed inset-0 h-full w-full object-cover opacity-[0.58]"
        aria-hidden="true"
      />
      <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(180deg,rgba(244,248,252,0.62)_0%,rgba(255,255,255,0.76)_42%,rgba(244,248,252,0.9)_100%),radial-gradient(circle_at_top_left,rgba(0,80,164,0.18),transparent_34rem)]" />
      <div className="relative mx-auto flex w-full max-w-[1240px] flex-col gap-5 sm:gap-8">
        <RegistrationHero />
        <RegistrationIntro />
        <RegistrationBenefits />
        {registrationResult ? (
          <RegistrationSuccess
            registration={registrationResult}
            onReset={() => setRegistrationResult(null)}
          />
        ) : (
          <RegistrationForm onSubmitSuccess={setRegistrationResult} />
        )}
        <RegistrationPrivacy />
      </div>
    </div>
  );
}
