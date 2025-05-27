// src/components/CategorySection/AllCategorySection.jsx
import React from 'react';
import NikeCategory from './NikeCategory';
import AsianCategory from './AsianCategory';
import CampusCategory from './CampusCategory';
import AdidasCategory from './AdidasCategory';
import PumaCategory from './PumaCategory';
import ReebokCategory from './ReebokCategory';
import ManCategory from './ManCategory';
import WomanCategory from './WomanCategory';
import SportCategory from './SportCategory';
import SneakersCategory from './SneakersCategory';

export default function AllCategorySection() {
  return (
    <section className="py-8">
      <h2 className="text-3xl font-bold text-center mb-6">Shop by Category</h2>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          <NikeCategory />
          <AsianCategory />
          <CampusCategory />
          <AdidasCategory />
          <PumaCategory />
          <ReebokCategory />
          <ManCategory />
          <WomanCategory />
          <SportCategory />
          <SneakersCategory />
        </div>
      </div>
    </section>
  );
}
