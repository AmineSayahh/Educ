import React from "react";
import hero from "../../assets/hero.png";
import { logos } from "../../Data";
import { motion } from "framer-motion";
const Home = () => {
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
        staggerChildren: 0.1,
      },
    },
  };
  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };
  return (
    <div>
      <div className="important-bg" id="home" style={{ backgroundColor: "#ECEBEC", padding: "110px"}}>
        <div className="md:flex items-center justify-center ml-auto">
          <div>
            <div className="font-bold text-xs text-Teal mb-4 sm:text-[1rem] text-[1.5rem]">
              {" "}
              Notre centre est le meilleur ⭐️

              </div>
            <div className="sm:text-[2.5rem] text-[1.825rem] font-bold">
            "L'éducation est la <br />
            clé qui ouvre la porte 
              à un avenir brillant.          </div>
            <p className="text-sm leading-7 text-gray max-w-sm">
            "L'éducation est l'arme la plus puissante pour changer le monde." - Nelson Mandela
            </p>
            
          </div>
          <div className="md:w-[60%]">
            <img src={hero} alt="" />
          </div>
        </div>
        <div>
          <p className="text-center text-xl">
          Nous collaborons avec{" "}
            <span className="text-Teal">
              100+ école et certifié de Ministère de l'Éducation (Tunisie)
            </span>
          </p>
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            className="flex items-center justify-center flex-wrap gap-8 p-2"
          >
            {logos.map((logo, index) => (
              <motion.div variants={item} className="w-28" key={index}>
                <img src={logo} alt="" className="w-full object-cover" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>

  );
};

export default Home;
