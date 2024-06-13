import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";

// Variants
const perspective = {
  initial: {
    y: 400,
  },
  enter: (i) => ({
    y: 0,
    transition: {
      delay: 0.2 + i * 0.2,
      ease: [0.76, 0, 0.24, 1],
      duration: 1,
    },
  }),
};

function App() {
  //ScrollRef
  const cont = useRef();
  const { scrollYProgress } = useScroll({
    target: cont,
    offset: ["start start", "end end"],
  });

  return (
    <AnimatePresence mode="wait">
      <main ref={cont} className="main-cont">
        <header>
          <p>Parrot.org</p>
          <button>Donate</button>
        </header>
        <Banner scrollYProgress={scrollYProgress} />
        <Section />
      </main>
    </AnimatePresence>
  );
}

export default App;

const Banner = ({ scrollYProgress }) => {
  const titles = "A bright future for parrots.";
  //Apply Scroll to Scale
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.3]);

  return (
    <motion.section className="banner-container">
      <div className="banner">
        <h2>
          {titles.split(" ").map((elem, i) => {
            return (
              <motion.p
                variants={perspective}
                initial="initial"
                animate="enter"
                custom={i}
                key={i}
              >
                {elem}
              </motion.p>
            );
          })}
        </h2>
      </div>
      <motion.div style={{ scale }} className="video-container">
        <video
          src="/videos/parrot-video.mp4"
          loop
          muted
          autoPlay={true}
          className="video"
        ></video>
      </motion.div>
    </motion.section>
  );
};

function Section() {
  return (
    <section>
      <div className="text">
        <h5>Intelligent animals</h5>
        <div className="text-container">
          <p>
            Parrots are a group of birds that are characterized by their
            intelligence, color and ability to imitate sounds, including the
            human voice. They are native to tropical and subtropical regions
            around the world, and there are more than 350 different species.
          </p>
          <p>
            They communicate with each other through a variety of vocalizations,
            including screeching, squawking, and singing. Some species of
            parrots can also learn to imitate human words and phrases.
          </p>
          <p>
            Parrots are popular pets around the world. However, it is important
            to remember that they are wild animals and require special care.
          </p>
        </div>
      </div>
      <footer>
        <h5>Thanks For Caring.</h5>
        <p>Parrot.org</p>
      </footer>
    </section>
  );
}
