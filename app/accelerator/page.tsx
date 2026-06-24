import AccelNavbar from "./components/AccelNavbar";
import AccelHero from "./components/AccelHero";
import TrustBar from "./components/TrustBar";
import WhyAttend from "./components/WhyAttend";
import Speakers from "./components/Speakers";
import EventTimeline from "./components/EventTimeline";
import SuccessStories from "./components/SuccessStories";
import WhatYouLearnAccel from "./components/WhatYouLearnAccel";
import AccelForm from "./components/AccelForm";
import EventDetails from "./components/EventDetails";
import AccelFAQ from "./components/AccelFAQ";
import AccelCTA from "./components/AccelCTA";
import AccelFooter from "./components/AccelFooter";

export default function AcceleratorPage() {
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
