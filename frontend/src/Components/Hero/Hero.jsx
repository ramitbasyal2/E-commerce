import React, { useState, useEffect } from 'react'
import image1 from '../../assets/image1.jpg';
import image2 from '../../assets/image2.jpg';
import image3 from '../../assets/image3.jpg';
import image4 from '../../assets/image4.jpg';
import image5 from '../../assets/image5.jpg';

// ── Slide Data ──────────────────────────────────────────────
const slides = [
  { id: 1, image: image1, text: "Shop anything you want, stay chill !!", btnText: "Learn More" },
  { id: 2, image: image2, text: "Shop anything you want, stay chill !!", btnText: "Learn More" },
  { id: 3, image: image3, text: "Shop anything you want, stay chill !!", btnText: "Learn More" },
  { id: 4, image: image4, text: "Shop anything you want, stay chill !!", btnText: "Learn More" },
  { id: 5, image: image5, text: "Shop anything you want, stay chill !!", btnText: "Learn More" },
];

// ── Component ───────────────────────────────────────────────
const Hero = () => {
  const [current, setCurrent] = useState(0); // active slide index

  // Auto-slide every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(timer); // cleanup
  }, []);

  return (
    <div className="relative -z-10 w-full h-[90vh] overflow-hidden">

      {/* ── Slides stacked on top of each other ── */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-700
            ${index === current ? 'opacity-100' : 'opacity-0'}`}
        >
          {/* Image */}
          <img
            src={slide.image}
            alt={slide.text}
            className="w-full h-full object-cover object-center"
          />

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60" />

          {/* Text + Button */}
          <div className="absolute inset-0 flex flex-col items-center justify-center
                          text-center text-white px-5">
            <p className="text-sm md:text-lg tracking-widest uppercase opacity-80 mb-3">
              New Collection
            </p>
            <h1 className="text-3xl md:text-6xl font-bold max-w-2xl leading-tight mb-6">
              {slide.text}
            </h1>
            <button className="bg-white text-black font-semibold px-8 py-3
                               rounded-full hover:scale-105 transition-transform duration-200">
              {slide.btnText}
            </button>
          </div>
        </div>
      ))}

      {/* ── Dot Indicators ── */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2
                      flex items-center gap-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-[10px] rounded-full border-none cursor-pointer
                        transition-all duration-300
                        ${index === current
                          ? 'w-7 bg-white'           // active: wide + white
                          : 'w-[10px] bg-white/40'}  // inactive: small + faded
                       `}
          />
        ))}
      </div>

    </div>
  );
};

export default Hero;