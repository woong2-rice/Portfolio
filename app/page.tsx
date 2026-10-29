import { Hero, Showcase } from "@/components/home/showcase";
import { MakerNote } from "@/components/home/maker-note";
import { Contact } from "@/components/home/contact";
import { SiteFooter } from "@/components/site-footer";

export default function Home() {
  return (
    <>
      <Hero />
      <Showcase />
      <MakerNote />
      <Contact />
      <SiteFooter />
    </>
  );
}
