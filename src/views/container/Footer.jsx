import { BsFacebook, BsInstagram, BsTwitter } from 'react-icons/bs';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-900 p-10 text-white"
    >
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
        <div>
          <div className="font-extrabold text-lg mb-6">Commencez votre parcours</div>
          <p className="text-sm leading-7">
            Découvrez une expérience d'apprentissage unique, conçue pour vous aider à acquérir de nouvelles compétences et à atteindre vos objectifs éducatifs.
          </p>
        </div>
        <div>
          <div className="font-extrabold text-lg mb-6">Services</div>
          <div className="flex flex-col gap-2">
            <a  className="text-sm hover:text-teal-400 transition duration-300">Mathématique</a>
            <a  className="text-sm hover:text-teal-400 transition duration-300">Science</a>
            <a  className="text-sm hover:text-teal-400 transition duration-300">Physique</a>
            <a  className="text-sm hover:text-teal-400 transition duration-300">Arabe</a>
          </div>
        </div>
        <div>
          <div className="font-extrabold text-lg mb-6">Entreprise</div>
          <div className="flex flex-col gap-2">
            <a  className="text-sm hover:text-teal-400 transition duration-300">Politique de confidentialité</a>
            <a  className="text-sm hover:text-teal-400 transition duration-300">Plan du site</a>
            <a  className="text-sm hover:text-teal-400 transition duration-300">Carrières</a>
            <a  className="text-sm hover:text-teal-400 transition duration-300">Conditions générales d'utilisation</a>
          </div>
        </div>
        <div>
          <div className="font-extrabold text-lg mb-6">Suivez-nous</div>
          <div className="text-sm mb-2">T3allemaana@gmail.com</div>
          <div className="text-sm mb-4">+216 99 700 768</div>
          <div className="flex gap-4 mt-4">
            <a  className="hover:scale-110 text-xl transition duration-300">
              <BsFacebook />
            </a>
            <a  className="hover:scale-110 text-xl transition duration-300">
              <BsInstagram />
            </a>
            <a  className="hover:scale-110 text-xl transition duration-300">
              <BsTwitter />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Footer;
