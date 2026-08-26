import { Outlet } from 'react-router';

import PublicInteractionAnalytics from '@/components/analytics/PublicInteractionAnalytics';
import Footer from '@/sections/Footer';
import Navigation from '@/sections/Navigation';

export default function PublicLayout() {
  return (
    <div className="relative isolate min-h-screen bg-marathon-cream text-marathon-blue">
      <PublicInteractionAnalytics />
      <Navigation />
      <main className="relative z-0">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
