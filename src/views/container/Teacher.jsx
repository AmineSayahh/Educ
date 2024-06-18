import React from "react";
import teacher1 from "../../assets/teacher1.png";
import teacher2 from "../../assets/teacher2.png";
import teacher3 from "../../assets/teacher3.png";
import { accordions } from "../../Data";
import Accordion from "./Accordion";
const Teacher = () => {
  return (
    <div
      className="important-bg"
      id="teacher"
      style={{ backgroundColor: "#ECEBEC", padding: "110px" }}
    >
      <div className="grid sm:grid-cols-2 place-items-center gap-8">
        <div className="pl-5">
          <div className="font-bold sm:text-[1.875rem] text-[1.5rem] mb-5">
            Noureddine <span className="text-Teal">Ben Amor</span> <br />{" "}
            Enseignant de Mathématique
          </div>
          <p className="text-sm leading-7 text-gray mb-5">
            M. Noureddine Ben Amor est un professeur de mathématiques
            exceptionnel dont la passion pour les chiffres est contagieuse.
            Grâce à ses méthodes d'enseignement innovantes et à sa capacité à
            rendre les concepts les plus complexes accessibles et intéressants,
            il inspire ses élèves à exceller.
          </p>
      
          </div>
        <div className="p-4 md:w-3/4 sm:row-start-1">
          <img src={teacher1} alt="" />
        </div>
        <div className="pl-5">
          <div className="font-bold sm:text-[1.875rem] text-[1.5rem] mb-5">
            Feriel <span className="text-Teal">Mrad</span> <br />
            Enseignante de Science
          </div>
          <p className="text-sm leading-7 text-gray mb-5">
            Mme Feriel Mrad incarne l'excellence dans l'enseignement des
            sciences. Dotée d'une passion contagieuse pour la découverte et la
            compréhension du monde qui nous entoure, elle captive ses élèves
            avec sa curiosité insatiable et son approche dynamique de
            l'enseignement
          </p>
 
          </div>
        <div className="p-4 md:w-3/4">
          <img src={teacher2} alt="" />
        </div>
        <div className="pl-5">
          <div className="font-bold sm:text-[1.875rem] text-[1.5rem] mb-5">
            Raja <span className="text-Teal">Lahmar</span> <br />
            Enseignante de Physique
          </div>
          <p className="text-sm leading-7 text-gray mb-5">
            Mme Raja Lahmar incarne la passion et l'enthousiasme pour
            la physique dans sa salle de classe. Avec son énergie vibrante et sa
            dévotion à la discipline, elle transforme chaque leçon en une
            aventure captivante d'exploration et de découverte
          </p>
        
        </div>
        <div className="p-4 md:w-3/4 sm:row-start-1">
          <img src={teacher3} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Teacher;
