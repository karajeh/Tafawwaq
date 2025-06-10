"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const ClssesComponent: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const content = [
    {
      title: "Interactive Whiteboard",
      text: "Our intuitive virtual whiteboard helps you stay engaged with interactive polls, quizzes, and shared resources, making sure that each lesson is enjoyable and effective.",
      imgSrc: "images/tab-image-1.png",
    },
    {
      title: "Self-Assessment Report",
      text: "A concise evaluation of performance, highlighting strengths, challenges, and areas for growth to support continuous improvement and goal setting.",
      imgSrc: "images/tab-image-2.png",
    },
    {
      title: "Convenient Scheduling",
      text: "Easily book sessions at your preferred time with flexible scheduling options that fit your busy lifestyle.",
      imgSrc: "images/tab-image-3.png",
    },
    {
      title: "Flexible Cancellations",
      text: "Change or cancel your sessions with ease, offering you the freedom to adjust your schedule without hassle.",
      imgSrc: "images/tab-image-4.png",
    },
  ];

  return (
    <section className="thirdSection">
      <div className="container">
        <div className="thirdSectionWrapper">
          <motion.div
            initial={{ opacity: 0, transform: `translate(0px, 20px)` }}
            whileInView={{ opacity: 1, transform: `translate(0px, 0px)` }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="sectionTitle">
              Do your most important <span>Classes, faster</span>
            </h2>
          </motion.div>
          <div className="thirdSection__row">
            <ul className="listNavigation">
              <div className="listNavigationScrolAnimation">
                <div
                  className={`skrollElement position-${activeIndex + 1}`}
                ></div>
              </div>
              {content.map((item, index) => (
                <li
                  key={index}
                  className={`tabButton ${
                    activeIndex === index ? "active" : ""
                  }`}
                  onClick={() => setActiveIndex(index)}
                >
                  <motion.div
                    initial={{ opacity: 0, transform: `translate(-50px, 0px)` }}
                    whileInView={{
                      opacity: 1,
                      transform: `translate(0px, 0px)`,
                    }}
                    transition={{ duration: 0.4 }}
                  >
                    <h3
                      className={`listNavigation-title ${
                        activeIndex === index ? "active" : ""
                      }`}
                    >
                      {item.title}
                    </h3>
                    <p
                      className={`listNavigation-text ${
                        activeIndex === index ? "active" : ""
                      }`}
                    >
                      {item.text}
                    </p>
                  </motion.div>
                </li>
              ))}
            </ul>
            <div className="chosedSectionImg">
              {content.map((item, index) => (
                <React.Fragment key={index}>
                  <motion.div
                    initial={{ opacity: 0, transform: `translate(50px, 0px)` }}
                    whileInView={{
                      opacity: 1,
                      transform: `translate(0px, 0px)`,
                    }}
                    transition={{ duration: 0.4 }}
                  >
                    <Image
                      width={1019}
                      height={612}
                      style={{maxWidth: "1120px", width: "100%", height: "700px", objectFit: "contain"}}
                      className={`tabImg ${
                        activeIndex === index ? "active" : ""
                      }`}
                      src={`/${item.imgSrc}`}
                      alt=""
                    />
                  </motion.div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClssesComponent;
