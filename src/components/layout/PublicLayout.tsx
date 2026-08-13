import { Outlet } from 'react-router';
import Footer from '@/sections/Footer';
import Navigation from '@/sections/Navigation';

export default function PublicLayout() {
  return (
    <div className="min-h-screen bg-marathon-cream">
      <Navigation />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
