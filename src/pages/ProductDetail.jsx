import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import homeData from '../assets/data/home.json';

function ProductDetail() {
  const { id } = useParams();
  const product = homeData.find(p => p.id === parseInt(id));

  if (!product) {
    return (
      <div>
        <Navbar />
        <div className="max-w-7xl mx-auto py-8 px-4">
          <h1 className="text-3xl font-bold">Product not found</h1>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto py-8 px-4">
        <div className="grid md:grid-cols-2 gap-8">
          <img
            src={product.imageUrl}
            alt={product.name || 'Product'}
            className="w-full h-96 object-contain rounded-lg"
          />
          <div className="space-y-4">
            <h1 className="text-3xl font-bold">{product.name || 'No Name'}</h1>
            <p className="text-2xl font-semibold">${product.price || 'N/A'}</p>
            <p className="text-gray-600">{product.longDescription || ''}</p>
            <div className="pt-4">
              <h3 className="text-lg font-semibold mb-2">Select Size</h3>
              <div className="flex flex-wrap gap-2">
                {(product.sizes || []).map(size => (
                  <button
                    key={size}
                    className="px-4 py-2 border rounded hover:bg-gray-100"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;

