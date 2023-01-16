import React, { useEffect, useState } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { sliderData } from "./slider_data";
import "./Slider.scss";

const Slider = () => {
  const [currentSlide, setcurrentSlide] = useState(0);
  const slideLength = sliderData.length;

  const autoScroll = true;
  let slideInterval;
  let intervaltime = 5000;

  const prevSlide = () => {
    setcurrentSlide(currentSlide === 0 ? slideLength - 1 : currentSlide - 1);
  };
  const nextSlide = () => {
    setcurrentSlide(currentSlide === slideLength - 1 ? 0 : currentSlide + 1);
  };

  useEffect(() => {
    setcurrentSlide(0);
  }, [0]);

  useEffect(() => {
    if (autoScroll) {
      function auto() {
        slideInterval = setInterval(nextSlide, intervaltime);
      }
      auto();
    }
    return () => clearTimeout(slideInterval);
  }, [currentSlide, slideInterval, autoScroll]);

  return (
    <div className="slider">
      <AiOutlineArrowLeft className="arrow prev" onClick={prevSlide} />
      <AiOutlineArrowRight className="arrow next" onClick={nextSlide} />
      {sliderData.map((slide, index) => {
        const { image, heading, desc } = slide;
        return (
          <div
            key={index}
            className={index === currentSlide ? "slide current" : "slide"}
          >
            {index === currentSlide && (
              <>
                <img src={image} alt="slide" />
                <div className="content">
                  <h2>{heading}</h2>
                  <p>{desc}</p>
                  <hr />
                  <a href="#product" className="--btn --btn-primary">
                    Shop Now
                  </a>
                </div>
              </>
            )}
            slide
          </div>
        );
      })}
    </div>
  );
};

export default Slider;
