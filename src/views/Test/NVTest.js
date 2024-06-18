import React, { useState } from "react";

const NVTest = () => {
  const [questions, setQuestions] = useState([
    {
      id: 1,
      question: "",
      options: ["", "", "" , ""],
      selectedOption: null,
    },
  ]);
  const [submitted, setSubmitted] = useState(false);

  const handleQuestionChange = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index].question = value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options[optionIndex] = value;
    setQuestions(newQuestions);
  };

  const handleOptionSelect = (questionIndex, optionIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].selectedOption = optionIndex;
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        id: questions.length + 1,
        question: "",
        options: ["", "", "", ""],
        selectedOption: null,
      },
    ]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const jsonData = JSON.stringify(questions, null, 2);
    const blob = new Blob([jsonData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "test_questions.json";
    a.click();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-screen-lg">
        <h2 className="text-3xl font-semibold mb-6 text-center text-white">Création de Test de Niveau</h2>
        {submitted ? (
          <p className="text-green-500 text-lg mb-6 text-center">Vos questions ont été soumises avec succès !</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {questions.map(({ id, question, options, selectedOption }, questionIndex) => (
                <div key={id} className="bg-gray-700 p-4 rounded-lg">
                  <input
                    type="text"
                    style={{color : "black"}}
                    placeholder="Écrire la question ici"
                    value={question}
                    onChange={(e) => handleQuestionChange(questionIndex, e.target.value)}
                    className="w-full p-2 mb-2 rounded-lg"
                  />
                  {options.map((option, optionIndex) => (
                    <div key={optionIndex} className="flex items-center mb-2 text-white">
                      <input
                        type="checkbox"
                        name={`question-${questionIndex}`}
                        checked={selectedOption === optionIndex}
                        onChange={() => handleOptionSelect(questionIndex, optionIndex)}
                        className="form-radio h-5 w-5 text-blue-600"
                      />
                      <input
                        type="text"
                        style={{color : "black"}}
                        placeholder="Écrire l'option ici"
                        value={option}
                        onChange={(e) => handleOptionChange(questionIndex, optionIndex, e.target.value)}
                        className="ml-2 w-full p-2 rounded-lg"
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <button
              type="button"
              style={{backgroundColor : "blue"}}
              onClick={addQuestion}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-400 transition-colors block mx-auto mb-6"
            >
              Ajouter une Question
            </button>
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

export default NVTest;
