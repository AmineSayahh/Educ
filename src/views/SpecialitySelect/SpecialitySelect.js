import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const SpecialtySelect = () => {
  const [specialties, setSpecialties] = useState([]);
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const history = useHistory();

  useEffect(() => {
    axios.get('http://localhost:4500/api/specialites')
      .then(res => {
        setSpecialties(res.data);
      })
      .catch(err => console.error(err));
  }, []);

  const handleSelectChange = (event) => {
    setSelectedSpecialty(event.target.value);
  };

  const handleSubmit = () => {
    if (selectedSpecialty) {
      history.push(`/testForm/${selectedSpecialty}`);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-screen-md">
        <h2 className="text-3xl font-semibold mb-6 text-center text-white">Choisissez une spécialité</h2>
        <div className="mb-4">
          <select
            value={selectedSpecialty}
            onChange={handleSelectChange}
            className="form-select block w-full mt-1 rounded-md bg-gray-700 text-white"
          >
            <option value="">Sélectionnez une spécialité</option>
            {specialties.map(specialty => (
              <option key={specialty._id} value={specialty._id}>{specialty.nom}</option>
            ))}
          </select>
        </div>
        <button
          onClick={handleSubmit}
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-400 transition-colors block mx-auto"
        >
          Suivant
        </button>
      </div>
    </div>
  );
};

export default SpecialtySelect;
