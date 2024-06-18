import { BiCalculator } from "react-icons/bi";
import { GiTestTubes } from "react-icons/gi";
import { FaLanguage } from "react-icons/fa";
import { MdOutlineScience } from "react-icons/md";

import courses1 from "./assets/courses1.jpg";
import courses2 from "./assets/courses2.jpg";
import courses3 from "./assets/courses3.jpg";
import courses4 from "./assets/courses4.jpg";


import logo1 from "./assets/logo1.png";
import logo2 from "./assets/logo2.png";
import logo3 from "./assets/logo3.png";
import logo4 from "./assets/logo4.png";
import logo5 from "./assets/logo5.png";
import logo6 from "./assets/logo6.png";

export const navLinks = [
  {
    id: 1,
    href: "home",
    link: "Accueil",
  },
  {
    id: 2,
    href: "about",
    link: "A propos",
  },
  {
    id: 3,
    href: "courses",
    link: "Nos Cours",
  },
  {
    id: 4,
    href: "teacher",
    link: "Nos Profs",
  },

];

export const categories = [
  {
    id: 1,
    icon: <BiCalculator className="text-black dark:text-teal-400" />,
    category: "Math",
  },
  {
    id: 2,
    icon: <GiTestTubes className="text-black dark:text-teal-400" />,
    category: "Physique",
  },
  {
    id: 3,
    icon: <FaLanguage className="text-black dark:text-teal-400" />,
    category: "Français",
  },
  {
    id: 4,
    icon: <MdOutlineScience className="text-black dark:text-teal-400" />,
    category: "Science",
  },
];


export const courses = [
  {
    id: 1,
    image: courses1,
    category: "Math",
    title: "Exploration Mathématique",
    rating: 4.9,
    participants: 500,
    price: 105,
  },
  {
    id: 2,
    image: courses2,
    category: "Physique",
    title: "Les Mystères du Monde Physique",
    rating: 4.8,
    participants: 700,
    price: 125,
  },
  {
    id: 3,
    image: courses3,
    category: "Français",
    title: "Voyage Littéraire : Explorez les Richesses de la Langue Française",
    rating: 4.9,
    participants: 300,
    price: 99,
  },
  {
    id: 4,
    image: courses4,
    category: "Science",
    title: "Exploration Scientifique : Découvrez les Mystères du Monde Naturel",
    rating: 4.7,
    participants: 600,
    price: 85,
  },
  {
    id: 5,
    image: courses1,
    category: "Math",
    title: "Exploration Mathématique",
    rating: 4.9,
    participants: 500,
    price: 105,
  },
  {
    id: 6,
    image: courses2,
    category: "Physique",
    title: "Les Mystères du Monde Physique",
    rating: 4.9,
    participants: 500,
    price: 105,
  },
  {
    id: 7,
    image: courses3,
    category: "Français",
    title: "Voyage Littéraire : Explorez les Richesses de la Langue Française",
    rating: 4.9,
    participants: 500,
    price: 105,
  },
  {
    id: 8,
    image: courses4,
    category: "Science",
    title: "Exploration Scientifique : Découvrez les Mystères du Monde Naturel",
    rating: 4.9,
    participants: 500,
    price: 105,
  },
];

export const logos = [logo1, logo2, logo3, logo4, logo5, logo6];

export const accordions = [
  {
    id: 1,
    title: "What is Skillex?",
  },
  {
    id: 2,
    title: "What can I learn from Skillex?",
  },
  {
    id: 3,
    title: "Can I teach on Skillex?",
  },
  {
    id: 4,
    title: "What is included in my Skillex membership?",
  },
];
