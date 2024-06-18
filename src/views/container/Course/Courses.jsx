import React from "react";
import { categories } from "../../../Data";
import { courses } from "../../../Data";
import Categories from "./Categories";
import Course from "./Course";
import { motion } from "framer-motion";

const Courses = () => {
  const container = {
    hidden: {
      opacity: 0,
      scale: 0,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };
  return (
    <div className="important-bg dark:bg-gray-900 dark:text-white" id="courses" style={{ backgroundColor: "#ECEBEC", padding: "110px" }}>
      <div className="text-center">
        <div className="sm:text-3xl text-2xl font-bold mb-5">
          Nos meilleures <span className="text-Teal dark:text-teal-400">Cours</span>
        </div>
        <p className="text-sm text-gray-700 dark:text-gray-300 leading-7 max-w-[700px] mx-auto">
          La meilleure des éducations est celle qui éveille en nous la soif d'apprendre,
          qui nous guide vers la découverte de notre potentiel
          et qui nous inspire à atteindre de nouveaux sommets.
        </p>
      </div>
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        className="grid md:grid-cols-4 sm:grid-cols-2 mt-12 gap-8"
      >
        {categories.map((category) => {
          return <Categories key={category.id} {...category} />;
        })}
      </motion.div>
      <div className="text-xl font-bold mt-32 dark:text-teal-400">Cours les plus populaires</div>
      <div className="mt-12 overflow-x-hidden w-full relative">
        <div className="flex gap-8 md:w-full sm:w-[170%] xs:w-[340%] w-[480%] animate-slide">
          {courses.map((course) => {
            return <Course key={course.id} {...course} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Courses;

