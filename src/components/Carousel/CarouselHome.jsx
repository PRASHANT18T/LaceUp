// src/components/CarouselHome.jsx
import React, { useEffect, useState } from 'react';

const images = [
  './src/assets/images/CarouselHome-img1.jpg',
  './src/assets/images/CarouselHome-img5.jpg',
  '/src/assets/images/CarouselHome-img6.jpg',
  '/src/assets/images/CarouselHome-img4.jpg',
  '/src/assets/images/CarouselHome-img2.jpg',
  '/src/assets/images/CarouselHome-img3.jpg',
];

export default function CarouselHome() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const iv = setInterval(() => {
      setIdx(i => (i + 1) % images.length);
    }, 3000);
    return () => clearInterval(iv);
  }, []);

  return (
    <div className="relative  w-full h-[500px] overflow-hidden rounded-2xl shadow-lg  ">
      {images.map((src, i) => (
        <img
          key={i}
          src={src}
          alt={`Slide ${i}`}
          className={`
            absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 
            ${i === idx ? 'opacity-100' : 'opacity-0'}
          `}
        />
      ))}

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {images.map((_, i) => (
          <span
            key={i}
            className={`
              block w-3 h-3 rounded-full transition-all duration-300
              ${i === idx ? 'bg-white' : 'bg-white/40'}
            `}
          />
        ))}
      </div>
    </div>
  );
}
