import React, { useState } from "react";

const TestForm = () => {
  const questions = [
    {
      id: 1,
      question: "Quel est le résultat de 2 + 2 ?",
      options: ["3", "4", "5"],
    },
    {
      id: 2,
      question: "Combien de côtés a un hexagone ?",
      options: ["5", "6", "7"],
    },
    {
      id: 3,
      question: "Quelle est la solution de cette équation x^2 = 4 ?",
      options: ["2", "-2 et 2", "0"],
    },
    {
      id: 4,
      question: "Quel est le périmètre d'un carré de côté 3 cm ?",
      options: ["9 cm", "12 cm", "15 cm"],
    },
    {
      id: 5,
      question: "Quel est l'aire d'un rectangle de 4 cm de largeur et 5 cm de longueur ?",
      options: ["9 cm²", "20 cm²", "10 cm²"],
    },
    {
      id: 6,
      question: "Quel est le résultat de 10 / 2 ?",
      options: ["3", "4", "5"],
    },
  ];

  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleCheckboxChange = (questionId, optionIndex) => {
    setAnswers({
      ...answers,
      [questionId]: optionIndex,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const responseObj = {};
    questions.forEach((question) => {
      responseObj[question.question] = question.options[answers[question.id]];
    });
    const jsonData = JSON.stringify(responseObj, null, 2);
    const blob = new Blob([jsonData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "test_responses.json";
    a.click();
    setAnswers({});
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-screen-lg">
        <h2 className="text-3xl font-semibold mb-6 text-center text-white">Formulaire de Test de Niveau</h2>
        {submitted ? (
          <p className="text-green-500 text-lg mb-6 text-center">Vos réponses ont été soumises avec succès !</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {questions.map(({ id, question, options }) => (
                <div key={id} className="bg-gray-700 p-4 rounded-lg">
                  <p className="font-medium mb-2 text-white">{question}</p>
                  {options.map((option, index) => (
                    <label key={index} className="flex items-center mb-2 text-white">
                      <input
                        type="checkbox"
                        checked={answers[id] === index}
                        onChange={() => handleCheckboxChange(id, index)}
                        className="form-checkbox h-5 w-5 text-blue-600"
                      />
                      <span className="ml-2">{option}</span>
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
