"use client";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { motion } from "framer-motion";
import Link from "next/link";

const StepsComponent: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 920);
    };

    handleResize(); // Викликати один раз при завантаженні
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    autoplay: true,
    autoplaySpeed: 10000,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <section className="secondSection">
      <div className="container">
        <div className="secondSectionWrapper">
          <motion.div
            initial={{ opacity: 0, transform: `translate(0px, 20px)` }}
            whileInView={{ opacity: 1, transform: `translate(0px, 0px)` }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="sectionTitle elementOfTheFonForTitle">
              Start Learning In <span>4 Simple Steps</span>
            </h2>
          </motion.div>
          {isMobile ? (
            <Slider {...settings}>
              <div>
                <motion.div
                  initial={{ opacity: 0, transform: `translate(0px, 60px)` }}
                  whileInView={{ opacity: 1, transform: `translate(0px, 0px)` }}
                  transition={{ duration: 0.7 }}
                >
                  <div className="secondSection__row-column">
                    <div className="iconBlue">
                      <svg
                        width="38"
                        height="30"
                        viewBox="0 0 38 30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M19.0003 0L0.666992 10L7.33366 13.6333V23.6333L19.0003 30L30.667 23.6333V13.6333L34.0003 11.8167V23.3333H37.3337V10L19.0003 0ZM30.367 10L19.0003 16.2L7.63366 10L19.0003 3.8L30.367 10ZM27.3337 21.6667L19.0003 26.2L10.667 21.6667V15.45L19.0003 20L27.3337 15.45V21.6667Z"
                          fill="white"
                        />
                      </svg>
                    </div>
                    <h3 className="secondSection__row-column-title">
                      Find Your Perfect Tutor
                    </h3>
                    <p className="secondSection__row-column-text">
                      Browse through a diverse selection of highly qualified
                      tutors who match your learning needs and preferences.
                    </p>
                    <button className="learnMore">
                      Find your tutor{" "}
                      <svg
                        width="9"
                        height="14"
                        viewBox="0 0 9 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M2 1.81982L7 6.81982L2 11.8198"
                          stroke="#3D4DFF"
                          stroke-width="3"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                </motion.div>
              </div>

              <div className="marginBox">
                <motion.div
                  initial={{ opacity: 0, transform: `translate(0px, 60px)` }}
                  whileInView={{ opacity: 1, transform: `translate(0px, 0px)` }}
                  transition={{ duration: 0.7 }}
                >
                  <div className="secondSection__row-column">
                    <div className="iconGreen">
                      <svg
                        width="31"
                        height="31"
                        viewBox="0 0 31 31"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M15.5 29C18.17 29 20.7801 28.2082 23.0002 26.7248C25.2203 25.2414 26.9506 23.133 27.9724 20.6662C28.9942 18.1994 29.2615 15.485 28.7406 12.8663C28.2197 10.2475 26.9339 7.84207 25.0459 5.95406C23.1579 4.06606 20.7525 2.78031 18.1337 2.2594C15.515 1.7385 12.8006 2.00585 10.3338 3.02763C7.86697 4.04942 5.75856 5.77974 4.27516 7.99981C2.79176 10.2199 2 12.83 2 15.5C2 17.66 2.507 19.7 3.41 21.5105C4.0895 22.877 3.1445 24.7205 2.7845 26.066C2.70474 26.3636 2.70473 26.6769 2.78446 26.9745C2.86419 27.2721 3.02085 27.5435 3.2387 27.7613C3.45655 27.9792 3.72791 28.1358 4.0255 28.2155C4.32308 28.2953 4.63642 28.2953 4.934 28.2155C6.2795 27.8555 8.123 26.9105 9.4895 27.5915C11.3573 28.5189 13.4146 29.001 15.5 29Z"
                          stroke="white"
                          stroke-width="4"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </div>
                    <h3 className="secondSection__row-column-title">
                      Connect & Communicate
                    </h3>
                    <p className="secondSection__row-column-text">
                      Engage in a conversation with your selected tutor to
                      discuss your goals, expectations, and learning style
                      before committing to a lesson.
                    </p>
                    <button className="learnMore">
                      Learn More{" "}
                      <svg
                        width="9"
                        height="14"
                        viewBox="0 0 9 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M2 1.81982L7 6.81982L2 11.8198"
                          stroke="#3D4DFF"
                          strokeWidth="3"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </button>
                    <Link href="/find-a-tutor">
                      <button className="learnMore hover:text-zinc-400">
                        Find a Tutor{" "}
                        <svg
                          width="9"
                          height="14"
                          viewBox="0 0 9 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M2 1.81982L7 6.81982L2 11.8198"
                            stroke="#3D4DFF"
                            stroke-width="3"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </button>
                    </Link>
                  </div>
                </motion.div>
              </div>
              <div>
                <motion.div
                  initial={{ opacity: 0, transform: `translate(0px, 60px)` }}
                  whileInView={{ opacity: 1, transform: `translate(0px, 0px)` }}
                  transition={{ duration: 0.7 }}
                >
                  <div className="secondSection__row-column">
                    <div className="iconBlue">
                      <svg
                        width="42"
                        height="42"
                        viewBox="0 0 42 42"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g filter="url(#filter0_d_1_2936)">
                          <path
                            d="M19.3714 2H33.776C34.848 2 35.7166 2.86857 35.7166 3.94057V19.4331C35.7166 20.5074 34.848 21.376 33.776 21.376H22M12.0549 10.0023C13.116 10.0023 14.1337 9.58074 14.8841 8.83038C15.6344 8.08002 16.056 7.06231 16.056 6.00114C16.056 4.93997 15.6344 3.92227 14.8841 3.17191C14.1337 2.42155 13.116 2 12.0549 2C10.9937 2 9.97598 2.42155 9.22562 3.17191C8.47526 3.92227 8.05371 4.93997 8.05371 6.00114C8.05371 7.06231 8.47526 8.08002 9.22562 8.83038C9.97598 9.58074 10.9937 10.0023 12.0549 10.0023Z"
                            stroke="white"
                            stroke-width="3"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M25.4286 13.4903C25.4286 12.1943 24.3771 11.1428 23.0811 11.1428H12.0549C10.4492 11.1434 8.90947 11.7815 7.7741 12.9169C6.63872 14.0523 6.00061 15.592 6 17.1977V22.5714H8.59429L9.46057 31.7142H14.6491L16.6423 15.84H23.0811C24.3771 15.84 25.4286 14.7885 25.4286 13.4903Z"
                            stroke="white"
                            stroke-width="3"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </g>
                        <defs>
                          <filter
                            id="filter0_d_1_2936"
                            x="0.5"
                            y="0.5"
                            width="40.7168"
                            height="40.7142"
                            filterUnits="userSpaceOnUse"
                            color-interpolation-filters="sRGB"
                          >
                            <feFlood
                              flood-opacity="0"
                              result="BackgroundImageFix"
                            />
                            <feColorMatrix
                              in="SourceAlpha"
                              type="matrix"
                              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                              result="hardAlpha"
                            />
                            <feOffset dy="4" />
                            <feGaussianBlur stdDeviation="2" />
                            <feComposite in2="hardAlpha" operator="out" />
                            <feColorMatrix
                              type="matrix"
                              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                            />
                            <feBlend
                              mode="normal"
                              in2="BackgroundImageFix"
                              result="effect1_dropShadow_1_2936"
                            />
                            <feBlend
                              mode="normal"
                              in="SourceGraphic"
                              in2="effect1_dropShadow_1_2936"
                              result="shape"
                            />
                          </filter>
                        </defs>
                      </svg>
                    </div>
                    <h3 className="secondSection__row-column-title">
                      Book Your Lesson
                    </h3>
                    <p className="secondSection__row-column-text">
                      Book your lesson with our seamless scheduling system at a
                      convenient time and date that suits you.
                    </p>
                    <Link href="/find-a-tutor" className="hover:text-zinc-400">
                      <button className="learnMore hover:text-zinc-400">
                        Find a Tutor{" "}
                        <svg
                          width="9"
                          height="14"
                          viewBox="0 0 9 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M2 1.81982L7 6.81982L2 11.8198"
                            stroke="#3D4DFF"
                            stroke-width="3"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </button>
                    </Link>
                  </div>
                </motion.div>
              </div>
              <div className="marginBox">
                <motion.div
                  initial={{ opacity: 0, transform: `translate(0px, 60px)` }}
                  whileInView={{ opacity: 1, transform: `translate(0px, 0px)` }}
                  transition={{ duration: 0.7 }}
                >
                  <div className="secondSection__row-column">
                    <div className="iconGreen">
                      <svg
                        width="39"
                        height="26"
                        viewBox="0 0 39 26"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M32.5 0C33.362 0 34.1886 0.34241 34.7981 0.951903C35.4076 1.5614 35.75 2.38805 35.75 3.25V19.5C35.75 21.3037 34.3037 22.75 32.5 22.75H39V26H0V22.75H6.5C5.63805 22.75 4.8114 22.4076 4.2019 21.7981C3.59241 21.1886 3.25 20.362 3.25 19.5V3.25C3.25 1.44625 4.69625 0 6.5 0H32.5ZM32.5 3.25H6.5V19.5H32.5V3.25ZM19.5 13C23.0912 13 26 14.4625 26 16.25V17.875H13V16.25C13 14.4625 15.9087 13 19.5 13ZM19.5 4.875C20.362 4.875 21.1886 5.21741 21.7981 5.8269C22.4076 6.4364 22.75 7.26305 22.75 8.125C22.75 8.98695 22.4076 9.8136 21.7981 10.4231C21.1886 11.0326 20.362 11.375 19.5 11.375C17.6963 11.375 16.25 9.92875 16.25 8.125C16.25 6.32125 17.7125 4.875 19.5 4.875Z"
                          fill="white"
                        />
                      </svg>
                    </div>
                    <h3 className="secondSection__row-column-title">
                      Join the Virtual Classroom
                    </h3>
                    <p className="secondSection__row-column-text">
                      Attend the lesson in our interactive and secure video
                      conference platform for a personalized and effective
                      learning experience.
                    </p>
                    <Link href="/find-a-tutor">
                      <button className="learnMore hover:text-zinc-400">
                        Find a Tutor{" "}
                        <svg
                          width="9"
                          height="14"
                          viewBox="0 0 9 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M2 1.81982L7 6.81982L2 11.8198"
                            stroke="#3D4DFF"
                            stroke-width="3"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </button>
                    </Link>
                  </div>
                </motion.div>
              </div>
            </Slider>
          ) : (
            <div className="secondSection__row">
              <motion.div
                initial={{ opacity: 0, transform: `translate(0px, 60px)` }}
                whileInView={{ opacity: 1, transform: `translate(0px, 0px)` }}
                transition={{ duration: 0.7 }}
              >
                <div className="secondSection__row-column">
                  <div className="iconBlue">
                    <svg
                      width="38"
                      height="30"
                      viewBox="0 0 38 30"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M19.0003 0L0.666992 10L7.33366 13.6333V23.6333L19.0003 30L30.667 23.6333V13.6333L34.0003 11.8167V23.3333H37.3337V10L19.0003 0ZM30.367 10L19.0003 16.2L7.63366 10L19.0003 3.8L30.367 10ZM27.3337 21.6667L19.0003 26.2L10.667 21.6667V15.45L19.0003 20L27.3337 15.45V21.6667Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                  <h3 className="secondSection__row-column-title">
                    Find Your Perfect Tutor
                  </h3>
                  <p className="secondSection__row-column-text">
                    Browse through a diverse selection of highly qualified
                    tutors who match your learning needs and preferences..
                  </p>
                  <Link href="/find-a-tutor">
                    <button className="learnMore hover:text-zinc-400">
                      Find a Tutor{" "}
                      <svg
                        width="9"
                        height="14"
                        viewBox="0 0 9 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M2 1.81982L7 6.81982L2 11.8198"
                          stroke="#3D4DFF"
                          stroke-width="3"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </button>
                  </Link>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, transform: `translate(0px, 60px)` }}
                whileInView={{ opacity: 1, transform: `translate(0px, 0px)` }}
                transition={{ duration: 0.7 }}
              >
                <div className="secondSection__row-column marginBox">
                  <div className="iconGreen">
                    <svg
                      width="31"
                      height="31"
                      viewBox="0 0 31 31"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15.5 29C18.17 29 20.7801 28.2082 23.0002 26.7248C25.2203 25.2414 26.9506 23.133 27.9724 20.6662C28.9942 18.1994 29.2615 15.485 28.7406 12.8663C28.2197 10.2475 26.9339 7.84207 25.0459 5.95406C23.1579 4.06606 20.7525 2.78031 18.1337 2.2594C15.515 1.7385 12.8006 2.00585 10.3338 3.02763C7.86697 4.04942 5.75856 5.77974 4.27516 7.99981C2.79176 10.2199 2 12.83 2 15.5C2 17.66 2.507 19.7 3.41 21.5105C4.0895 22.877 3.1445 24.7205 2.7845 26.066C2.70474 26.3636 2.70473 26.6769 2.78446 26.9745C2.86419 27.2721 3.02085 27.5435 3.2387 27.7613C3.45655 27.9792 3.72791 28.1358 4.0255 28.2155C4.32308 28.2953 4.63642 28.2953 4.934 28.2155C6.2795 27.8555 8.123 26.9105 9.4895 27.5915C11.3573 28.5189 13.4146 29.001 15.5 29Z"
                        stroke="white"
                        stroke-width="4"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                  <h3 className="secondSection__row-column-title">
                    Connect & Communicate
                  </h3>
                  <p className="secondSection__row-column-text">
                    Engage in a conversation with your selected tutor to discuss
                    your goals, expectations, and learning style before
                    committing to a lesson.
                  </p>
                  <Link href="/find-a-tutor">
                    <button className="learnMore hover:text-zinc-400">
                      Find a Tutor{" "}
                      <svg
                        width="9"
                        height="14"
                        viewBox="0 0 9 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M2 1.81982L7 6.81982L2 11.8198"
                          stroke="#3D4DFF"
                          stroke-width="3"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </button>
                  </Link>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, transform: `translate(0px, 60px)` }}
                whileInView={{ opacity: 1, transform: `translate(0px, 0px)` }}
                transition={{ duration: 0.7 }}
              >
                <div className="secondSection__row-column">
                  <div className="iconBlue">
                    <svg
                      width="42"
                      height="42"
                      viewBox="0 0 42 42"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g filter="url(#filter0_d_1_2936)">
                        <path
                          d="M19.3714 2H33.776C34.848 2 35.7166 2.86857 35.7166 3.94057V19.4331C35.7166 20.5074 34.848 21.376 33.776 21.376H22M12.0549 10.0023C13.116 10.0023 14.1337 9.58074 14.8841 8.83038C15.6344 8.08002 16.056 7.06231 16.056 6.00114C16.056 4.93997 15.6344 3.92227 14.8841 3.17191C14.1337 2.42155 13.116 2 12.0549 2C10.9937 2 9.97598 2.42155 9.22562 3.17191C8.47526 3.92227 8.05371 4.93997 8.05371 6.00114C8.05371 7.06231 8.47526 8.08002 9.22562 8.83038C9.97598 9.58074 10.9937 10.0023 12.0549 10.0023Z"
                          stroke="white"
                          stroke-width="3"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M25.4286 13.4903C25.4286 12.1943 24.3771 11.1428 23.0811 11.1428H12.0549C10.4492 11.1434 8.90947 11.7815 7.7741 12.9169C6.63872 14.0523 6.00061 15.592 6 17.1977V22.5714H8.59429L9.46057 31.7142H14.6491L16.6423 15.84H23.0811C24.3771 15.84 25.4286 14.7885 25.4286 13.4903Z"
                          stroke="white"
                          stroke-width="3"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </g>
                      <defs>
                        <filter
                          id="filter0_d_1_2936"
                          x="0.5"
                          y="0.5"
                          width="40.7168"
                          height="40.7142"
                          filterUnits="userSpaceOnUse"
                          color-interpolation-filters="sRGB"
                        >
                          <feFlood
                            flood-opacity="0"
                            result="BackgroundImageFix"
                          />
                          <feColorMatrix
                            in="SourceAlpha"
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha"
                          />
                          <feOffset dy="4" />
                          <feGaussianBlur stdDeviation="2" />
                          <feComposite in2="hardAlpha" operator="out" />
                          <feColorMatrix
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                          />
                          <feBlend
                            mode="normal"
                            in2="BackgroundImageFix"
                            result="effect1_dropShadow_1_2936"
                          />
                          <feBlend
                            mode="normal"
                            in="SourceGraphic"
                            in2="effect1_dropShadow_1_2936"
                            result="shape"
                          />
                        </filter>
                      </defs>
                    </svg>
                  </div>
                  <h3 className="secondSection__row-column-title">
                    Book Your Lesson
                  </h3>
                  <p className="secondSection__row-column-text">
                    Book your lesson with our seamless scheduling system at a
                    convenient time and date that suits you.
                  </p>
                  <Link href="/find-a-tutor" className="hover:text-zinc-400">
                    <button className="learnMore hover:text-zinc-400">
                      Find a Tutor{" "}
                      <svg
                        width="9"
                        height="14"
                        viewBox="0 0 9 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M2 1.81982L7 6.81982L2 11.8198"
                          stroke="#3D4DFF"
                          stroke-width="3"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </button>
                  </Link>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, transform: `translate(0px, 60px)` }}
                whileInView={{ opacity: 1, transform: `translate(0px, 0px)` }}
                transition={{ duration: 0.7 }}
              >
                <div className="secondSection__row-column marginBox">
                  <div className="iconGreen">
                    <svg
                      width="39"
                      height="26"
                      viewBox="0 0 39 26"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M32.5 0C33.362 0 34.1886 0.34241 34.7981 0.951903C35.4076 1.5614 35.75 2.38805 35.75 3.25V19.5C35.75 21.3037 34.3037 22.75 32.5 22.75H39V26H0V22.75H6.5C5.63805 22.75 4.8114 22.4076 4.2019 21.7981C3.59241 21.1886 3.25 20.362 3.25 19.5V3.25C3.25 1.44625 4.69625 0 6.5 0H32.5ZM32.5 3.25H6.5V19.5H32.5V3.25ZM19.5 13C23.0912 13 26 14.4625 26 16.25V17.875H13V16.25C13 14.4625 15.9087 13 19.5 13ZM19.5 4.875C20.362 4.875 21.1886 5.21741 21.7981 5.8269C22.4076 6.4364 22.75 7.26305 22.75 8.125C22.75 8.98695 22.4076 9.8136 21.7981 10.4231C21.1886 11.0326 20.362 11.375 19.5 11.375C17.6963 11.375 16.25 9.92875 16.25 8.125C16.25 6.32125 17.7125 4.875 19.5 4.875Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                  <h3 className="secondSection__row-column-title">
                    Join the Virtual Classroom
                  </h3>
                  <p className="secondSection__row-column-text">
                    Attend the lesson in our interactive and secure video
                    conference platform for a personalized and effective
                    learning experience.
                  </p>
                  <Link href="/find-a-tutor">
                    <button className="learnMore hover:text-zinc-400">
                      Find a Tutor{" "}
                      <svg
                        width="9"
                        height="14"
                        viewBox="0 0 9 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M2 1.81982L7 6.81982L2 11.8198"
                          stroke="#3D4DFF"
                          stroke-width="3"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </button>
                  </Link>
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default StepsComponent;
