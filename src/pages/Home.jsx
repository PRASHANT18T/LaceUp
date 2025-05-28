// src/pages/Home.jsx
import React from 'react';
import Navbar from '../components/Navbar/Navbar';
// import CarouselHome from '../components/Carousel/CarouselHome'; // TODO: Uncomment when ready
// import HomeMainBanner from '../components/BannerAndGrids/HomeMainBanner'; // TODO: Uncomment when ready
import AllCategorySection from '../components/CategorySection/AllCategorySection';
import HomeProduct from '../pages/HomeProduct';
import Footer from '../components/Footer/Footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-blue-300">
      {/* Navbar */}
      <Navbar />

      {/* Carousel - placeholder */}
      {/* <CarouselHome /> */}
      <div className="h-64 bg-gray-200 flex items-center justify-center text-gray-500 mb-8">
        {/* TODO: CarouselHome component will go here */}
        <span className="italic">Carousel placeholder</span>
      </div>

      {/* Main Banner - placeholder */}
      {/* <HomeMainBanner /> */}
      <div className="h-48 bg-gray-300 flex items-center justify-center text-gray-600 mb-8">
        {/* TODO: HomeMainBanner component will go here */}
        <span className="italic">Main banner placeholder</span>
      </div>

      {/* Category Section */}
      <AllCategorySection />

      {/* Home Products Section */}
      <HomeProduct />

      {/* Footer at bottom */}
      <Footer />
    </div>
  );
}
