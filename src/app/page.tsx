import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { MitraSection } from "@/components/sections/MitraSection";
import { GallerySection } from "@/components/sections/GallerySection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <GallerySection />
      <MitraSection />
    </>
  );
}
