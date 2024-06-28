import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [msg, setMsg] = useState('');
  const [hastTest, setHasTest] = useState();


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const loginResponse = await axios.post("http://localhost:4500/api/login", {
        email: email,
        password: password
      });
  
      if (loginResponse.data.token) {
        // Save the token in localStorage
        localStorage.setItem("token", loginResponse.data.token);
        localStorage.setItem("userId", loginResponse.data.id);
  
        console.log(loginResponse);
  
        // Extract user information from the response
        const userRole = loginResponse.data.__t;
  
        // Save the user role in localStorage if needed
        localStorage.setItem("USER_ROLE", userRole);
  
        // Fetch the test status
        const testResponse = await axios.get(`http://localhost:4500/api/getTestByUserId/${localStorage.getItem("userId")}`);
        const hasTest = testResponse.data; // Assuming the response contains a boolean value
  
        setHasTest(hasTest);
        console.log("Test status:", hasTest);
  
        // Redirect based on user role and test status
        if (userRole === "Eleve") {
          if (hasTest === false) {
            window.location.href = "/SpeciaitySelect";
          } else if (hasTest === true) {
            window.location.href = "/DashboardEleve";
          }
        } else if (userRole === "admin") {
          window.location.href = "/dashboard";
        } else if (userRole === "Enseignant") {
          localStorage.setItem("USER_ROLE", userRole);
          window.location.href = "/DashboardEnseignant";
        } else {
          setMsg("email or password is invalid");
        }
      } else {
        alert('Verifier vos coordonnées');
      }
    } catch (err) {
      console.error(err);
      setMsg("An error occurred while logging in.");
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div className="relative">
              <input
                type={passwordVisible ? "text" : "password"}
                placeholder="Mot de passe"
                className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
            {msg && <p className="text-red-500 text-sm">{msg}</p>}
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
