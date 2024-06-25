import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";

export default function Signup() {
  const history = useHistory();
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:4500/api/users", {
        nom: formData.nom,
        prenom: formData.prenom,
        email: formData.email,
        password: formData.password,
        repeat_password : formData.password
      });

      console.log("Response:", response);

      // Assuming successful registration redirects to login page
      history.push("/login");
    } catch (error) {
      console.error("Error registering user:", error);
      // Handle error, show user-friendly message if needed
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
                name="nom"
                placeholder="Nom"
                className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
                value={formData.nom}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="prenom"
                placeholder="Prenom"
                className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
                value={formData.prenom}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
                value={formData.confirmPassword}
                onChange={handleChange}
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
                Vous avez déjà un compte ?{" "}
                <Link to="/login" className="text-green-800 font-bold">
                  Connexion
                </Link>
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
