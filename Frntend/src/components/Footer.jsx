import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, Star } from 'lucide-react';
import FeedbackForm from './FeedbackForm';

const Footer = () => {
  const [showFeedback, setShowFeedback] = useState(false);

  return (
    <>
      <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-3 rounded-lg font-bold text-xl shadow-lg">
                  IMovie
                </div>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                Your premier destination for movie ticket booking in Andhra Pradesh.
                Experience the magic of cinema with the best theaters and latest movies.
              </p>
              <div className="flex space-x-4 pt-2">
                <a href="#" className="text-gray-300 hover:text-red-400 transition-colors">
                  <div className="p-2 rounded-full bg-gray-800 hover:bg-red-600 transition-colors">
                    <Facebook className="h-5 w-5" />
                  </div>
                </a>
                <a href="#" className="text-gray-300 hover:text-red-400 transition-colors">
                  <div className="p-2 rounded-full bg-gray-800 hover:bg-red-600 transition-colors">
                    <Twitter className="h-5 w-5" />
                  </div>
                </a>
                <a href="#" className="text-gray-300 hover:text-red-400 transition-colors">
                  <div className="p-2 rounded-full bg-gray-800 hover:bg-red-600 transition-colors">
                    <Instagram className="h-5 w-5" />
                  </div>
                </a>
                <a href="#" className="text-gray-300 hover:text-red-400 transition-colors">
                  <div className="p-2 rounded-full bg-gray-800 hover:bg-red-600 transition-colors">
                    <Youtube className="h-5 w-5" />
                  </div>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-red-400">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="text-gray-300 hover:text-red-400 transition-colors text-sm hover:pl-2 duration-300">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/movies" className="text-gray-300 hover:text-red-400 transition-colors text-sm hover:pl-2 duration-300">
                    Movies
                  </Link>
                </li>
                <li>
                  <Link to="/theaters" className="text-gray-300 hover:text-red-400 transition-colors text-sm hover:pl-2 duration-300">
                    Theaters
                  </Link>
                </li>
                <li>
                  <Link to="/offers" className="text-gray-300 hover:text-red-400 transition-colors text-sm hover:pl-2 duration-300">
                    Offers & Deals
                  </Link>
                </li>
                <li>
                  <Link to="/gift-cards" className="text-gray-300 hover:text-red-400 transition-colors text-sm hover:pl-2 duration-300">
                    Gift Cards
                  </Link>
                </li>
              </ul>
            </div>

            {/* Customer Support */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-red-400">Customer Support</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/help" className="text-gray-300 hover:text-red-400 transition-colors text-sm hover:pl-2 duration-300">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link to="/faq" className="text-gray-300 hover:text-red-400 transition-colors text-sm hover:pl-2 duration-300">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="text-gray-300 hover:text-red-400 transition-colors text-sm hover:pl-2 duration-300">
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="text-gray-300 hover:text-red-400 transition-colors text-sm hover:pl-2 duration-300">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/refund" className="text-gray-300 hover:text-red-400 transition-colors text-sm hover:pl-2 duration-300">
                    Refund Policy
                  </Link>
                </li>
                <li>
                  <button 
                    onClick={() => setShowFeedback(true)}
                    className="text-gray-300 hover:text-red-400 transition-colors text-sm hover:pl-2 duration-300 flex items-center space-x-1"
                  >
                    <Star className="h-3 w-3" />
                    <span>Give Feedback</span>
                  </button>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-red-400">Contact Us</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-800 transition-colors">
                  <Phone className="h-4 w-4 text-red-400 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-300">Customer Care</p>
                    <p className="text-sm font-semibold">+91 0000000000</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-800 transition-colors">
                  <Mail className="h-4 w-4 text-red-400 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-300">Email Support</p>
                    <p className="text-sm font-semibold">support@imovieshow.com</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-2 rounded-lg hover:bg-gray-800 transition-colors">
                  <MapPin className="h-4 w-4 text-red-400 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-sm text-gray-300">Head Office</p>
                    <p className="text-sm font-semibold">
                      Aitam-clg, Srikakulam<br />
                      Andhra Pradesh, India
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Cities We Serve */}
          <div className="border-t border-gray-700 mt-8 pt-8">
            <h3 className="text-lg font-semibold mb-6 text-red-400">Cities We Serve</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {[
                'Visakhapatnam',
                'Vijayawada',
                'Guntur',
                'Nellore',
                'Tirupati',
                'Kurnool',
                'Rajahmundry',
                'Eluru',
                'Anantapur',
                'Kadapa',
                'Chittoor',
                'Srikakulam',
                'Narasaraopet',
                'Mangalagiri',
                'Kakinada',
                'Tadepalligudem',
                'Bhimavaram'
              ].map((city) => (
                <Link
                  key={city}
                  to={`/?city=${city}`}
                  className="text-gray-300 hover:text-red-400 transition-all duration-300 text-sm p-2 rounded-lg hover:bg-gray-800 hover:pl-4"
                >
                  {city}
                </Link>
              ))}
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-300 mb-4 md:mb-0">
              © 2024 IMovieShow. All rights reserved. | Made with ❤️ for movie lovers
            </div>
            <div className="flex flex-wrap gap-4 text-sm">
              <Link to="/terms" className="text-gray-300 hover:text-red-400 transition-colors hover:underline">
                Terms of Service
              </Link>
              <Link to="/privacy" className="text-gray-300 hover:text-red-400 transition-colors hover:underline">
                Privacy Policy
              </Link>
              <Link to="/cookies" className="text-gray-300 hover:text-red-400 transition-colors hover:underline">
                Cookie Policy
              </Link>
              <Link to="/accessibility" className="text-gray-300 hover:text-red-400 transition-colors hover:underline">
                Accessibility
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {showFeedback && (
        <FeedbackForm onClose={() => setShowFeedback(false)} />
      )}
    </>
  );
};

export default Footer;