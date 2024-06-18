import { useHistory, Link } from "react-router-dom";   
import React from "react";

export default function Signup() {
  const history = useHistory(); 

  const handleSubmit = (event) => {
    event.preventDefault(); 
    const form = event.target;
    if (form.checkValidity()) {
     
      history.push("/login");
    } else {
     
      form.reportValidity();
    }
  };

  return (
    <div className="fixed inset-0 overflow-hidden">
      <div className="min-h-screen bg-green-800 flex justify-center items-center">
        <div className="absolute w-60 h-60 rounded-xl bg-green-700 -top-5 -left-16 z-0 transform rotate-45 hidden md:block"></div>
        <div className="absolute w-48 h-48 rounded-xl bg-green-700 -bottom-6 -right-10 transform rotate-12 hidden md:block"></div>
        <div className="py-12 px-12 bg-white rounded-2xl shadow-xl z-20">
          <div>
            <h1 className="text-3xl font-bold text-center mb-4 cursor-pointer">
              Créer un compte
            </h1>
            <p className="w-80 text-center text-sm mb-8 font-semibold text-gray-700 tracking-wide cursor-pointer">
              Créez un compte pour profiter de tous les services
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Nom"
                className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
                required
              />
              <input
                type="text"
                placeholder="Prenom"
                className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
                required
              />
              <input
                type="email"
                placeholder="Email"
                className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
                required
              />
              <input
                type="password"
                placeholder="Password"
                className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
                required
              />
              <input
                type="password"
                placeholder="Confirm password"
                className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
                required
              />
            </div>

            <div className="text-center mt-6">
              <button
                type="submit"
                className="py-3 w-64 text-xl text-white bg-green-800 rounded-2xl"
              >
                Inscription
              </button>
              <p className="mt-4 text-sm">
                Vous avez déjà un compte ? <Link to="/login" className="text-green-800 font-bold">Connexion</Link>
              </p>
            </div>
          </form>
        </div>
        <div className="w-40 h-40 absolute bg-green-700 rounded-full top-0 right-12 hidden md:block"></div>
        <div className="w-20 h-40 absolute bg-green-700 rounded-full bottom-20 left-10 transform rotate-45 hidden md:block"></div>
      </div>
    </div>
  );
}