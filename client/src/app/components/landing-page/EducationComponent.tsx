"use client";
import React from "react";
import { motion } from "framer-motion";

const EducationComponent: React.FC = () => {
  const content = [
    {
      title: "Elite, Handpicked Tutors",
      text: "Only the most qualified and trustworthy educators make it onto our platform.",
    },
    {
      title: "MENA’s No.1 Most Trusted Online Tutoring Platform",
      list: ["Recognised for industry", "Leading data protection and security"],
    },
    {
      title: "Guaranteed success in securing spots at prestigious universities",
      text: "Our students consistently earn admission to top-tier institutions, paving the way for a bright future.",
    },
  ];

  return (
    <section className="firstSection">
      <div className="container">
        <div className="firstSection__row">
          <div className="firstSection__row-column">
            <p className="firstSection__row-column-text">
              Our students consistently earn <br /> admission to top-tier
              institutions, <br /> paving the way for a{" "}
              <span>bright future.</span>
            </p>
          </div>

          {content.map((item, index) => (
            <React.Fragment key={index}>
              <motion.div
                initial={{
                  opacity: 0,
                  width: "100%",
                  maxWidth: "780px",
                  margin: "0 auto",
                  transform:
                    index === 0
                      ? `translate(0px, -100px)`
                      : index === 1
                      ? `translate(-100px, 0px)`
                      : `translate(0px, 100px)`,
                }}
                whileInView={{ opacity: 1, transform: `translate(0px, 0px)` }}
                transition={{ duration: 1 }}
              >
                <div className="firstSection__row-column columnLine">
                  <div>
                    <h3 className="firstSection__row-column-title">
                      {item.title}
                    </h3>
                    {item.text && (
                      <p className="firstSection__row-column-li">{item.text}</p>
                    )}
                    {item.list && (
                      <ul className="firstSection__row-column-list">
                        {item.list.map((listItem, listIndex) => (
                          <li
                            key={listIndex}
                            className="firstSection__row-column-li"
                          >
                            {listItem}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </motion.div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationComponent;
