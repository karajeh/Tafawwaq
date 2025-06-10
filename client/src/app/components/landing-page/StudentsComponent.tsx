"use client";
import Image from "next/image";
import Slider from "react-slick";

export default function StudentsComponent() {
  const settings = {
    infinite: true,
    centerMode: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 10000,
    arrows: false,
    dots: true,
  };

  return (
    <section className="fourthSection">
      <div style={{ maxWidth: "100vw" }}>
        <div className="fourthWrapper">
          <h2 className="sectionTitle">
            Hear from our <span>Students</span>
          </h2>
          <div className="fourthSection__slider">
            <Slider {...settings}>
              <div>
                <div className="fourthSection__slider-slide flex flex-col justify-center items-center py-8 px-6">
                  {/* <Image
                    width={169}
                    height={169}
                    className="avatar"
                    src="/images/slide-image-1.png"
                    alt="Student Avatar"
                  /> */}
                  <p className="fourthSection__slider-slide-name mb-3 mt-4 pt-10">
                    Julia
                  </p>
                  <Image
                    width={160}
                    height={42}
                    className="stars mb-4"
                    src="/images/stars.png"
                    alt="Rating stars"
                  />
                  <p className="fourthSection__slider-slide-description text-center leading-relaxed text-sm sm:text-base lg:text-lg px-2 pb-4">
                    &quot;This platform completely changed the way I study! I
                    struggled with math for years, but my tutor broke everything
                    down in a way that finally made sense. Thanks to the
                    personalized sessions, I improved my grades and got accepted
                    into my dream university. Highly recommend to anyone looking
                    for real results.&quot;
                  </p>
                </div>
              </div>
              <div>
                <div className="fourthSection__slider-slide flex flex-col justify-center items-center py-8 px-6">
                  {/* <Image
                    width={169}
                    height={169}
                    className="avatar"
                    src="/images/slide-image-2.png"
                    alt="Student Avatar"
                  /> */}
                  <p className="fourthSection__slider-slide-name mb-3 mt-4">
                    Andree
                  </p>
                  <Image
                    width={160}
                    height={42}
                    className="stars mb-4"
                    src="/images/stars.png"
                    alt="Rating stars"
                  />
                  <p className="fourthSection__slider-slide-description text-center leading-relaxed text-sm sm:text-base lg:text-lg px-2">
                    Finding the right tutor was so easy, and the sessions made a
                    huge difference. I boosted my grades and got into my
                    top-choice university!
                  </p>
                </div>
              </div>
              <div>
                <div className="fourthSection__slider-slide flex flex-col justify-center items-center py-8 px-6">
                  {/* <Image
                    width={169}
                    height={169}
                    className="avatar"
                    src="/images/slide-image-2.png"
                    alt="Student Avatar"
                  /> */}
                  <p className="fourthSection__slider-slide-name mb-3 mt-4">
                    Omar
                  </p>
                  <Image
                    width={160}
                    height={42}
                    className="stars mb-4"
                    src="/images/stars.png"
                    alt="Rating stars"
                  />
                  <p className="fourthSection__slider-slide-description text-center leading-relaxed text-sm sm:text-base lg:text-lg px-2">
                    Finding the right tutor was so easy, and the sessions made a
                    huge difference. I boosted my grades and got into my
                    top-choice university!
                  </p>
                </div>
              </div>
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
}
