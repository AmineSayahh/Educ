import React from "react";
import { motion } from "framer-motion";

const Categories = ({ icon, category }) => {
  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };
  return (
    <motion.div
      variants={item}
      whileHover={{ scale: 1.1 }}
      className="flex items-center flex-col gap-4 bg-white dark:bg-gray-800 p-8 rounded-md transition-all duration-300"
    >
      <div className="text-4xl text-Teal dark:text-teal-400">{icon}</div>
      <div className="text-black dark:text-white">{category}</div>
    </motion.div>
  );
};

export default Categories;
