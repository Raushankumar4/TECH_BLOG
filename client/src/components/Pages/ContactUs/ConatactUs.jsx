import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { url, user } from "../../../constant";
import Footer from "../Footer/Footer";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { data } = await axios.post(`${url}${user}/contactus`, formData);
      console.log("Form submitted", formData);

      alert(data?.message);
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Submission error:", error);

      alert(
        error?.response?.data?.message ||
          "There was an error submitting your form. Please try again."
      );
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-200 dark:bg-gray-900">
        <div className="max-w-4xl mx-5 w-full bg-gray-200 md:my-20 my-10 p-6 shadow-xl rounded-lg dark:bg-gray-900">
          <motion.h1
            className="text-2xl mt-10 font-bold mb-6 text-gray-900 dark:text-gray-100"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Contact Us
          </motion.h1>
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Name Input */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-lg p-3 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 bg-gray-300"
              />
            </motion.div>

            {/* Email Input */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 bg-gray-300 block w-full border border-gray-300 rounded-lg p-3 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
              />
            </motion.div>

            {/* Subject Input */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="mt-1 bg-gray-300 block w-full border rounded-lg p-3 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
              />
            </motion.div>

            {/* Message Input */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                required
                className="mt-1 bg-gray-300 block w-full border border-gray-300 rounded-lg p-3 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
              />
            </motion.div>

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-gray-800 text-white px-4 py-2 rounded-lg text-base hover:bg-gray-600 dark:bg-gray-800 dark:text-gray-300 transition disabled:bg-gray-400"
              >
                {isSubmitting ? "Submitting..." : "Send Message"}
              </button>
            </motion.div>
          </motion.form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactUs;
