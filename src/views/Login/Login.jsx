import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

export default function Login() {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault(); // Empêche la soumission par défaut du formulaire

    const form = event.target;
    if (form.checkValidity()) {
      // Si tous les champs sont valides, effectuer l'action de connexion
      console.log("Form is valid. Proceed with login.");
    } else {
      // Si des champs sont invalides, affichez les messages de validation
      form.reportValidity();
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className='fixed inset-0 overflow-hidden'>
      <div className="min-h-screen bg-green-800 flex justify-center items-center">
        <div
          className="absolute w-60 h-60 rounded-xl bg-green-700 -top-5 -left-16 z-0 transform rotate-45 hidden md:block">
        </div>
        <div
          className="absolute w-48 h-48 rounded-xl bg-green-700 -bottom-6 -right-10 transform rotate-12 hidden md:block">
        </div>
        <div className="py-12 px-12 bg-white rounded-2xl shadow-xl z-20">
          <div>
            <h1 className="text-3xl font-bold text-center mb-4 cursor-pointer">Se connecter</h1>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
              required
            />
            <div className="relative">
              <input
                type={passwordVisible ? "text" : "password"}
                placeholder="Mot de passe"
                className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
                required
                minLength={6}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                onClick={togglePasswordVisibility}
              >
                <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye} />
              </button>
            </div>
            <div className="text-center mt-6">
              <button
                type="submit"
                className="py-3 w-64 text-xl text-white bg-green-800 rounded-2xl"
              >
                Connexion
              </button>
            </div>
          </form>
        </div>
        <div className="w-40 h-40 absolute bg-green-700 rounded-full top-0 right-12 hidden md:block"></div>
        <div
          className="w-20 h-40 absolute bg-green-700 rounded-full bottom-20 left-10 transform rotate-45 hidden md:block">
        </div>
      </div>
    </div>
  );
}