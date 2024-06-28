import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { CButton } from '@coreui/react';

const TestForm = () => {
  const { specialiteId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:4500/api/get-test/${specialiteId}/${localStorage.getItem("userId")}`)
      .then(res => {
        setQuestions(res.data);
      })
      .catch(err => console.error(err));
  }, [specialiteId]);

  const handleCheckboxChange = (questionId, optionIndex) => {
    setAnswers({
      ...answers,
      [questionId]: optionIndex,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const responses = questions.map((question) => ({
      questionId: question._id,
      option: question.reponse[answers[question._id]].option,
    }));

    axios.post(`http://localhost:4500/api/tests/score/${localStorage.getItem("userId")}`, { specialiteId, responses })
      .then(res => {
        setScore(res.data.score);
        setSubmitted(true);
      })
      .catch(err => {
        //console.error(err);
        // setError('An error occurred while submitting the test.');
      });
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-screen-lg">
        <h2 className="text-3xl font-semibold mb-6 text-center text-white">Formulaire de Test de Niveau</h2>
        {submitted ? (
          <>
            <p className="text-green-500 text-lg mb-6 text-center">Vos réponses ont été soumises avec succès !</p>
            {score !== null && <p className="text-white text-lg mb-6 text-center">Votre score: {score}</p>}
            {error && <p className="text-red-500 text-lg mb-6 text-center">{error}</p>}
            <CButton type='submit' onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/login";
            }}>
              Go to Login
            </CButton>          </>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {questions.map(({ _id, question, reponse }) => (
                <div key={_id} className="bg-gray-700 p-4 rounded-lg">
                  <p className="font-medium mb-2 text-white">{question}</p>
                  {reponse.map((option, index) => (
                    <label key={option._id} className="flex items-center mb-2 text-white">
                      <input
                        type="checkbox"
                        checked={answers[_id] === index}
                        onChange={() => handleCheckboxChange(_id, index)}
                        className="form-checkbox h-5 w-5 text-blue-600"
                      />
                      <span className="ml-2">{option.option}</span>
                    </label>
                  ))}
                </div>
              ))}
            </div>
            <button
              type="submit"
              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-400 transition-colors block mx-auto"
            >
              Soumettre
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default TestForm;
