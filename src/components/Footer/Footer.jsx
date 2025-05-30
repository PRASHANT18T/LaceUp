// src/components/Footer/Footer.jsx
import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaGithub } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-6 mt-20 text-sm">
      <div className="container mx-auto px-6">
        {/* Logo & About */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-gray-700 pb-10 mb-8">
          <img src="/assets/logo.png" alt="LaceUp Logo" className="w-32 mb-4 md:mb-0" />
          <p className="max-w-md leading-relaxed text-gray-400">
            LaceUp brings you the latest in premium sneakers and sportswear.  
            Shop with confidence, style, and comfort all in one place.
          </p>
        </div>

        {/* Links Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="/about" className="hover:text-white transition">About Us</a></li>
              <li><a href="/careers" className="hover:text-white transition">Careers</a></li>
              <li><a href="/blog" className="hover:text-white transition">Blog</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="/help" className="hover:text-white transition">Help Center</a></li>
              <li><a href="/shipping" className="hover:text-white transition">Shipping & Returns</a></li>
              <li><a href="/contact" className="hover:text-white transition">Contact Us</a></li>
            </ul>
          </div>

          {/* Legal & Social */}
          <div>
            <h4 className="text-white font-semibold mb-4">Legal & Social</h4>
            <ul className="space-y-2 text-sm mb-4 text-gray-400">
              <li><a href="/terms" className="hover:text-white transition">Terms of Service</a></li>
              <li><a href="/privacy" className="hover:text-white transition">Privacy Policy</a></li>
            </ul>
            <div className="flex space-x-4 text-lg">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-white transition">
                <FaFacebookF />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-white transition">
                <FaTwitter />
              </a>
              <a href="https://www.instagram.com/prashant18t?igsh=b2E0ZDV1YzJsN2Fi" target="_blank" rel="noreferrer" className="hover:text-white transition">
                <FaInstagram />
              </a>
              <a href="https://www.linkedin.com/in/prashant-thube-18t/">
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright & Built By */}
        <div className="border-t border-gray-800 pt-6">
          <p className="text-center text-xs text-gray-500">
            © {new Date().getFullYear()} LaceUp. All rights reserved.
          </p>
          <div className="mt-4 text-center text-sm text-gray-400">
            Built with ❤️ by <span className="text-white font-medium">Prashant Thube</span> —
            <span className="text-yellow-400 font-semibold"> Full‑Stack / Frontend Developer</span>
          </div>
          <div className="flex justify-center space-x-4 mt-3">
            <a
              href="https://www.linkedin.com/in/prashant-thube-18t/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition text-gray-400 text-lg"
            >
              <FaLinkedinIn />
            </a>
            <a
              href="https://github.com/PRASHANT18T"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition text-gray-400 text-lg"
            >
              <FaGithub />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
