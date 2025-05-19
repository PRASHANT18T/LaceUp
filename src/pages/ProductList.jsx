import React from 'react';
import homeData from '../assets/data/home.json';

function ProductList() {
  return (
    <div>
      <div className="max-w-7xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8">Product List</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {homeData.map((product) => (
            <div key={product.id} className="border rounded-lg p-4">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-48 object-cover rounded"
              />
              <h2 className="text-xl font-semibold mt-2">{product.name}</h2>
              <p className="text-gray-600">${product.price}</p>
              <button className="">addToCart</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductList;