import { useEffect } from "react";
import About from "./About";
// import AskAI from "./AskAI";
// import BookCall from "./BookCall";
import Career from "./Career";
import Contact from "./Contact";
import Cursor from "./Cursor";
import Landing from "./Landing";
import MarqueeStrip from "./MarqueeStrip";
import Navbar from "./Navbar";
import ScrollProgress from "./ScrollProgress";
import Skills from "./Skills";
import Credentials from "./Credentials";
import Testimonials from "./Testimonials";
import WhatIDo from "./WhatIDo";
import Work from "./Work";
import setSplitText from "./utils/splitText";
import { setCareerTimeline } from "./utils/careerFX";
import { initSmoothScroll, destroySmoothScroll } from "./utils/smoothScroll";

const MainContainer = () => {
  useEffect(() => {
    const resizeHandler = () => {
      setSplitText();
    };
    resizeHandler();
    setCareerTimeline();
    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  useEffect(() => {
    initSmoothScroll();
    return () => {
      destroySmoothScroll();
    };
  }, []);

  return (
    <div className="container-main">
      <div className="bg-vignette" aria-hidden="true" />
      <ScrollProgress />
      <Cursor />
      <Navbar />
      {/* <AskAI /> */}
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <div className="container-main">
            <Landing />
            <About />
            <WhatIDo />
            <Career />
            <MarqueeStrip />
            <Work />
            <Skills />
            <Credentials />
            <Testimonials />
            {/* <BookCall /> */}
            <Contact />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContainer;
