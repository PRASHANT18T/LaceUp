// src/components/Footer/Footer.jsx
import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t mt-12">
      <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between text-gray-600 text-sm">
        <div className="mb-4 md:mb-0">
          © {new Date().getFullYear()} LaceUp. All rights reserved.
        </div>
        <div className="flex space-x-6">
          <a href="/terms" className="hover:text-gray-800">Terms of Service</a>
          <a href="/privacy" className="hover:text-gray-800">Privacy Policy</a>
          <a href="/contact" className="hover:text-gray-800">Contact Us</a>
        </div>
      </div>
    </footer>
  );
}
