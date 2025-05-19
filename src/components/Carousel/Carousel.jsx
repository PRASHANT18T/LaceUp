import React, { useEffect, useState } from "react";

// You can replace these with your own image paths or pass them as props
const images = [
  "https://img.freepik.com/premium-photo/stylish-mens-shoes-collection-highquality-jpg-image-fashion-projects_1179582-261.jpg?ga=GA1.1.425877410.1729409421&semt=ais_hybrid&w=740",
  "https://img.freepik.com/premium-photo/stylish-mens-shoes-collection-highquality-jpg-image-fashion-projects_1179582-261.jpg?ga=GA1.1.425877410.1729409421&semt=ais_hybrid&w=740",
  "https://img.freepik.com/premium-photo/stylish-mens-shoes-collection-highquality-jpg-image-fashion-projects_1179582-261.jpg?ga=GA1.1.425877410.1729409421&semt=ais_hybrid&w=740",
];

 function Carousel() {
  const [current, setCurrent] = useState(0);

  // Auto-slide every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  // Manual controls
  const goTo = (idx) => setCurrent(idx);
  const prev = () => setCurrent((prev) => (prev - 1 + images.length) % images.length);
  const next = () => setCurrent((prev) => (prev + 1) % images.length);

  return (
    <div className="relative w-full max-w-2xl mx-auto overflow-hidden rounded-lg">
      <img
        src={images[current]}
        alt={`Slide ${current + 1}`}
        className="w-full h-64 object-cover transition-all duration-700"
      />
      {/* Controls */}
      <button
        onClick={prev}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 rounded-full p-2"
        aria-label="Previous"
      >
        &#8592;
      </button>
      <button
        onClick={next}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 rounded-full p-2"
        aria-label="Next"
      >
        &#8594;
      </button>
      {/* Dots */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, idx) => (
          <button
            key={idx}
            className={`w-3 h-3 rounded-full ${current === idx ? "bg-blue-600" : "bg-gray-300"}`}
            onClick={() => goTo(idx)}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default Carousel;