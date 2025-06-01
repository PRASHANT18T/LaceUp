
// src/components/CategorySection/AllCategorySection.jsx
import React from 'react';
import { motion } from 'framer-motion';
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

const categories = [
  { key: 'nike', Component: NikeCategory },
  { key: 'asian', Component: AsianCategory },
  { key: 'campus', Component: CampusCategory },
  { key: 'adidas', Component: AdidasCategory },
  { key: 'puma', Component: PumaCategory },
  { key: 'reebok', Component: ReebokCategory },
  { key: 'man', Component: ManCategory },
  { key: 'woman', Component: WomanCategory },
  { key: 'sport', Component: SportCategory },
  { key: 'sneakers', Component: SneakersCategory },
];

export default function AllCategorySection() {
  return (
    <section className="py-12 bg-gray-700 text-white">
      {/* Title animates when scrolled into view */}
     <motion.h2
  className="text-3xl md:text-4xl font-extrabold text-center mb-10 text-gray-100"
  initial={{ opacity: 0, y: -30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.3 }}
  transition={{ duration: 0.6 }}
>
  Categorys
</motion.h2>

      <div className="container mx-auto px-4">
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } }
          }}
        >
          {categories.map(({ key, Component }) => (
            <motion.div
              key={key}
              className="bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow"
              variants={{
                hidden: { opacity: 0, scale: 0.95 },
                visible: { opacity: 1, scale: 1 }
              }}
              whileHover={{ scale: 1.05 }}
              viewport={{ once: true }}
            >
              <Component />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

