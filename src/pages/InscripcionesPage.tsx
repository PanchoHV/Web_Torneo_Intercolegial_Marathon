import { useState } from 'react';

import RegistrationForm from '@/components/registrations/RegistrationForm';
import RegistrationSuccess from '@/components/registrations/RegistrationSuccess';
import { textures } from '@/lib/assets/textures';
import {
  REGISTRATION_FAQ_DESCRIPTION,
  REGISTRATION_FAQ_ITEMS,
} from '@/lib/constants/inscripcionesPage';
import FaqSection from '@/sections/home/FaqSection';
import RegionStatusSection from '@/sections/home/RegionStatusSection';
import RegistrationFormSection from '@/sections/inscripciones/RegistrationFormSection';
import RegistrationGuideSection from '@/sections/inscripciones/RegistrationGuideSection';
import RegistrationHeroSection from '@/sections/inscripciones/RegistrationHeroSection';
import RegistrationKeyDatesSection from '@/sections/inscripciones/RegistrationKeyDatesSection';
import type { RegistrationResult } from '@/types/registration';

/**
 * Página /inscripciones.
 *
 * Header y Footer los aporta PublicLayout — aquí no se replica markup global.
 *
 * El contrato del formulario no cambia: la página sigue siendo dueña de
 * `registrationResult` y sigue intercambiando formulario por confirmación en
 * el mismo punto del árbol. Las secciones nuevas lo rodean sin tocarlo.
 */
export default function InscripcionesPage() {
  const [registrationResult, setRegistrationResult] = useState<RegistrationResult | null>(null);

  return (
    <div
      data-page="inscripciones"
      className="relative text-marathon-navy"
      style={{
        backgroundColor: '#F4F8FC',
        backgroundImage: `linear-gradient(180deg, rgba(255,255,255,0.26) 0%, rgba(255,255,255,0) 18%), url('${textures.paperBackground}')`,
        backgroundRepeat: 'repeat, repeat',
        backgroundPosition: 'center top, center top',
        backgroundSize: 'auto, 700px auto',
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(226,27,45,0.06),transparent_26%),radial-gradient(circle_at_bottom_right,rgba(0,80,164,0.05),transparent_26%)]"
      />

      <div className="relative">
        <RegistrationHeroSection />

        {/* Presentación y data del Home: un solo sistema de estado regional. */}
        <RegionStatusSection />

        <RegistrationGuideSection />

        <RegistrationFormSection isSubmitted={Boolean(registrationResult)}>
          {registrationResult ? (
            <RegistrationSuccess
              registration={registrationResult}
              onReset={() => setRegistrationResult(null)}
            />
          ) : (
            <RegistrationForm onSubmitSuccess={setRegistrationResult} />
          )}
        </RegistrationFormSection>

        <RegistrationKeyDatesSection />

        {/* Presentación del Home, contenido propio de inscripciones. */}
        <FaqSection
          id="faq-inscripciones"
          items={[...REGISTRATION_FAQ_ITEMS]}
          description={REGISTRATION_FAQ_DESCRIPTION}
        />
      </div>
    </div>
  );
}
