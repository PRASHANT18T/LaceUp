// Home.jsx
import Navbar from '../components/Navbar/Navbar';
import Carousel from '../components/Carousel/Carousel';
// import ProductGrid from '../components/BannerGrid/ProductGrid';
import ProductList from './ProductList';

export default function Home() {
  return (
    <div>
      <Navbar />
      <main className="py-8">
        <Carousel />

        <ProductList />
        {/* <ProductGrid /> */}
        {/* Add other sections */}
      </main>
    </div>
  );
}