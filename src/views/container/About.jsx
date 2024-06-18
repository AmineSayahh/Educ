import React from "react";
import about from "../../assets/About.jpg";

const About = () => {
  return (
    <div className="important-bg" id="about" style={{ backgroundColor: "#ECEBEC", padding: "110px"}}>
      <div className="grid md:grid-cols-2 gap-8 place-items-center">
        <div className="border-[3px] border-solid border-Teal rounded-lg">
          <img src={about} alt="" className="p-4" />
        </div>
        <div>
          <div className="font-bold sm:text-[1.875rem] text-[1.5rem] mb-5">
          Un centre de formation exceptionnel repose  <br />  sur{" "}
            <span className="text-Teal">une équipe exceptionnelle</span>
          </div>
          <p className="text-sm text-gray leading-7 mb-4">
          Le Centre de Formation T3ALLEM M3ANA est un lieu d'apprentissage dynamique et innovant, 
          dédié à l'éducation et au développement personnel et professionnel. 
          Nous proposons une large gamme de cours conçus pour répondre aux besoins variés des apprenants
                    </p>
         
        </div>
      </div>
    </div>
  );
};

export default About;
