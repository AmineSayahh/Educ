import React, { useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import { AnimatePresence, motion } from "framer-motion";

const Accordion = ({ id, title }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleClick = (id) => {
    setActiveIndex(id === activeIndex ? null : id);
  };

  return (
    <div className="pb-8">
      <div className="flex items-center justify-between cursor-pointer" onClick={() => handleClick(id)}>
        <div className="sm:text-xl text-base font-bold">{title}</div>
        <BsChevronDown
          className={`${
            id === activeIndex ? "rotate-180" : "rotate-0"
          } transition-transform duration-300`}
        />
      </div>
      <AnimatePresence initial={false}>
        {id === activeIndex && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ overflow: "hidden" }}
            className="pt-4"
          >
            <p className="text-sm leading-7 text-gray-700">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, eum
              beatae porro voluptatum aspernatur, id nesciunt reiciendis maxime
              unde necessitatibus illum accusamus mollitia incidunt qui nisi
              tempora facere magni magnam?
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Accordion;
