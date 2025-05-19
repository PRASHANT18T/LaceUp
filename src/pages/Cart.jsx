// Cart.jsx
import { useContext } from 'react';
// import { CartContext } from '../context/CartContext';
import Navbar from '../components/Navbar/Navbar';

export default function Cart() {
  const { cartItems } = useContext(CartContext);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
        {cartItems.length === 0 ? (
          <p className="text-gray-500">Your cart is empty</p>
        ) : (
          <div className="space-y-4">
            {cartItems.map(item => (
              <div key={item.id} className="flex items-center border-b py-4">
                <img 
                  src={item.imageUrl} 
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="ml-4 flex-1">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-gray-600">${item.price}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}