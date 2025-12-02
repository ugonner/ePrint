import React, { useState, useEffect } from "react";
import "./Banner.css";
import { isPlatform } from "@ionic/react";

const slides = [
  {
    top: "Smart Services",
    bottom:
      "Request printing, photocopying, scanning, and lamination from anywhere and get them delivered directly to your doorstep with ease.",
    backgroundImage: "/images/banners/banner-1.webp",
  },
  {
    top: "Digital Empowerment",
    bottom:
      "Learn basic computer appreciation skills through guided training designed to help users, including PWDs, build confidence and digital independence.",
    backgroundImage: "/images/banners/banner-3.webp",
  },
  {
    top: "Instant Creation",
    bottom:
      "Quickly generate personalized documents such as birthday cards, certificates, and letters using simple automated templates.",
    backgroundImage: "/images/banners/banner-2.jpg",
  },
];

export default function Banner() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, 10000); // 5 seconds per slide

    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="slider-container"
      style={{
        backgroundImage: `url(${slides[active].backgroundImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        height: "100vh",
      }}
    >
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`slide ${active === index ? "active" : ""}`}
        >
          <p className="top-text">
            <p
              style={{
                fontSize: isPlatform("desktop") ? "4em" : "2em",
                fontWeight: 1000,
              }}
            >
              {slide.top}
            </p>
            <p
              style={{
                width: isPlatform("desktop") ? "50%" : "100%",
                fontWeight: 500,
              }}
            >
              {slide.bottom}
            </p>
          </p>
          <p className="bottom-text">...</p>
        </div>
      ))}
    </div>
  );
}
