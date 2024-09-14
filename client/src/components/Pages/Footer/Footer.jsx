import React from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  const theme = useSelector((state) => state.theme.theme);
  return (
    <footer className={`bg-gray-900 text-gray-100 py-6 ${theme}`}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Left section - Branding */}
          <motion.div
            className="mb-4 md:mb-0"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-2xl font-bold">BLOG</h1>
          </motion.div>

          {/* Middle section - Navigation Links */}
          <motion.div
            className="mb-4 md:mb-0"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6">
              <li>
                <motion.a
                  href="#home"
                  className="hover:text-blue-400 transition"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  Home
                </motion.a>
              </li>
              <li>
                <motion.a
                  href="#about"
                  className="hover:text-blue-400 transition"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  About
                </motion.a>
              </li>
              <li>
                <motion.a
                  href="#services"
                  className="hover:text-blue-400 transition"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  Services
                </motion.a>
              </li>
              <li>
                <motion.a
                  href="#contact"
                  className="hover:text-blue-400 transition"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  Contact
                </motion.a>
              </li>
            </ul>
          </motion.div>

          {/* Right section - Social Icons and Copyright */}
          <motion.div
            className="flex flex-col items-center md:items-end"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex space-x-4 mb-2">
              <a
                href="https://facebook.com"
                className="text-gray-400 hover:text-blue-600"
              >
                <FaFacebookF size={20} />
              </a>
              <a
                href="https://twitter.com"
                className="text-gray-400 hover:text-blue-400"
              >
                <FaTwitter size={20} />
              </a>
              <a
                href="https://instagram.com"
                className="text-gray-400 hover:text-pink-600"
              >
                <FaInstagram size={20} />
              </a>
              <a
                href="https://linkedin.com"
                className="text-gray-400 hover:text-blue-700"
              >
                <FaLinkedinIn size={20} />
              </a>
            </div>
            <p className="text-sm">&copy; 2024 BLOG. All rights reserved.</p>
            <p className="text-xs mt-1">Created by Raushan Gupta</p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
