import { Hero } from '@/components/sections/Hero';
import { Features } from '@/components/sections/Features';
import { DemoPreview } from '@/components/sections/DemoPreview';
import { Testimonials } from '@/components/sections/Testimonials';

export default function LandingPage() {
  return (
    <>
      <Hero />
      <Features />
      <DemoPreview />
      <Testimonials />
    </>
  );
}
