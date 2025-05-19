// Home.jsx
import Navbar from '../components/Navbar/Navbar';

import ProductGrid from '../components/BannerGrid/ProductGrid';

export default function Home() {
  return (
    <div>
      <Navbar />
      <main className="py-8">
        {/* <Carousel /> */}
        <ProductGrid />
        {/* Add other sections */}
      </main>
    </div>
  );
}