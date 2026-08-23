import CopaChapterNav from '@/sections/copa/CopaChapterNav';
import CopaFormatSection from '@/sections/copa/CopaFormatSection';
import CopaHeroSection from '@/sections/copa/CopaHeroSection';
import CopaHistorySection from '@/sections/copa/CopaHistorySection';
import CopaWhatIsSection from '@/sections/copa/CopaWhatIsSection';

export default function LaCopaPage() {
  return (
    <>
      <CopaHeroSection />
      <CopaChapterNav />
      <CopaWhatIsSection />
      <CopaFormatSection />
      <CopaHistorySection />
    </>
  );
}
