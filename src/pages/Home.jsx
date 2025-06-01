// src/pages/Home.jsx
import React from 'react';
import Navbar from '../components/Navbar/Navbar';
 import CarouselHome from '../components/Carousel/CarouselHome'; 
 import HomeMainBanner from '../components/BannerAndGrids/HomeMainBanner'; 
import AllCategorySection from '../components/CategorySection/AllCategorySection';
import HomeProduct from '../pages/HomeProduct';
import Footer from '../components/Footer/Footer';
import HomeProductGrid from '../components/BannerAndGrids/HomeProductGrid';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-700 text-white">
      {/* Navbar */}
      <Navbar />

      {/* Carousel - placeholder */}
     
      <div className="  pb-8 pt-8">
        {/* TODO: CarouselHome component will go here */}
         <CarouselHome />
        {/* <span className="italic">Carousel placeholder</span> */}
      </div>

      {/* Main Banner - placeholder */}
     
      <div className="pb-8">
         <HomeMainBanner />
        {/* TODO: HomeMainBanner component will go here */}
        {/* <span className="italic">Main banner placeholder</span> */}
      </div>

      {/* Category Section */}
      <AllCategorySection />

        {/*HomeProductGrid  */}
      <HomeProductGrid />

      {/* Home Products Section */}
      <HomeProduct />

    


      {/* Footer at bottom */}
      <Footer />
    </div>
  );
}
