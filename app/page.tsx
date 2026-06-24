import AccelNavbar from "./accelerator/components/AccelNavbar";
import AccelHero from "./accelerator/components/AccelHero";
import TrustBar from "./accelerator/components/TrustBar";
import WhyAttend from "./accelerator/components/WhyAttend";
import Speakers from "./accelerator/components/Speakers";
import EventTimeline from "./accelerator/components/EventTimeline";
import SuccessStories from "./accelerator/components/SuccessStories";
import WhatYouLearnAccel from "./accelerator/components/WhatYouLearnAccel";
import AccelForm from "./accelerator/components/AccelForm";
import EventDetails from "./accelerator/components/EventDetails";
import AccelFAQ from "./accelerator/components/AccelFAQ";
import AccelCTA from "./accelerator/components/AccelCTA";
import AccelFooter from "./accelerator/components/AccelFooter";

export default function Home() {
  return (
    <main style={{ background: "#050816", minHeight: "100vh", overflowX: "hidden" }}>
      <AccelNavbar />
      <AccelHero />
      <TrustBar />
      <WhyAttend />
      <Speakers />
      <EventTimeline />
      <SuccessStories />
      <WhatYouLearnAccel />
      <AccelForm />
      <EventDetails />
      <AccelFAQ />
      <AccelCTA />
      <AccelFooter />
    </main>
  );
}
