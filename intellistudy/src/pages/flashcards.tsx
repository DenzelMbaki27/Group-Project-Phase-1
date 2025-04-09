'use client';

import { useState } from 'react';
import Navbar from '../components/Navbar';

type Flashcard = {
  question: string;
  answer: string;
};

const SpacedRepetitionFlashcards = () => {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [isFlipped, setIsFlipped] = useState(false);
  const [savedFlashcards, setSavedFlashcards] = useState<Flashcard[]>([]);
  const [inputTopic, setInputTopic] = useState('');
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);

  const generateQuestions = (topic: string) => {
    if (topic === 'math') {
      return [
        { question: 'What is 5 + 7?', answer: '12' },
        { question: 'What is 9 x 3?', answer: '27' },
        { question: 'What is 25 - 9?', answer: '16' },
      ];
    } else if (topic === 'science') {
      return [
        { question: 'What is the chemical symbol for gold?', answer: 'Au' },
        { question: 'What is the boiling point of water?', answer: '100°C' },
        { question: 'What planet is known as the Red Planet?', answer: 'Mars' },
      ];
    }
    return [{ question: 'No flashcards available for this topic.', answer: '' }];
  };

  const handleGenerateFlashcards = () => {
    const newFlashcards = generateQuestions(inputTopic);
    setFlashcards(newFlashcards);
    setCurrentCardIndex(0);
    setIsFlipped(false);
    setAnswer('');
    setIsAnswerCorrect(false);
  };

  const handleAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer(e.target.value);
  };

  const handleSubmitAnswer = () => {
    const currentCard = flashcards[currentCardIndex];
    if (answer.trim().toLowerCase() === currentCard.answer.trim().toLowerCase()) {
      setIsAnswerCorrect(true);
    } else {
      setIsAnswerCorrect(false);
    }
    setIsFlipped(true);
  };

  const handleSaveFlashcard = () => {
    const currentCard = flashcards[currentCardIndex];
    setSavedFlashcards((prev) => [...prev, currentCard]);
  };

  const handleNextFlashcard = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
    setAnswer('');
    setIsFlipped(false);
    setIsAnswerCorrect(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 text-gray-800">
      <Navbar />
      <div className="flex flex-1">
        {/* Sidebar for saved flashcards */}
        <div className="w-1/4 bg-white shadow-md p-4">
          <h2 className="text-lg font-bold mb-4">Saved Flashcards</h2>
          <ul>
            {savedFlashcards.map((card, index) => (
              <li key={index} className="mb-2 p-2 border rounded">
                <p className="font-semibold">{card.question}</p>
                <p className="text-sm text-gray-600">{card.answer}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          <div className="mb-6 text-center">
            <div className="card-container mb-6">
              <div className={`card-inner ${isFlipped ? 'flip' : ''}`}>
                <div className="card-face card-front">
                  <p>{flashcards[currentCardIndex]?.question || 'No question available'}</p>
                  <input
                    type="text"
                    value={answer}
                    onChange={handleAnswerChange}
                    placeholder="Type your answer"
                    className="input"
                  />
                  <button
                    onClick={handleSubmitAnswer}
                    className="button bg-blue-500 mt-2"
                  >
                    Submit
                  </button>
                </div>
                <div className="card-face card-back">
                  <p>{isAnswerCorrect ? 'Correct!' : 'Incorrect!'}</p>
                  <p>Answer: {flashcards[currentCardIndex]?.answer}</p>
                </div>
              </div>
            </div>

            <button
              onClick={handleSaveFlashcard}
              className="button bg-green-500"
            >
              Save
            </button>
            <button
              onClick={handleNextFlashcard}
              className="button bg-blue-500 ml-2"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Chatbox-like input */}
      <div className="fixed bottom-0 left-0 w-full bg-white shadow-md p-4 flex items-center">
        <input
          type="text"
          placeholder="Enter topic (e.g., math, science)"
          value={inputTopic}
          onChange={(e) => setInputTopic(e.target.value)}
          className="flex-1 input"
        />
        <button
          onClick={handleGenerateFlashcards}
          className="button bg-blue-500 ml-2"
        >
          Generate
        </button>
      </div>

      <style jsx>{`
        .card-container {
          perspective: 1000px;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 220px;
          height: 220px;
          margin: 20px auto;
          position: relative;
        }

        .card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          transition: transform 0.6s;
        }

        .card-inner.flip {
          transform: rotateY(180deg);
        }

        .card-face {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          font-size: 0.9rem;
          padding: 10px;
          text-align: center;
          border-radius: 10px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }

        .card-front {
          background-color: #f9fafb;
          color: #333;
          z-index: 2;
        }

        .card-back {
          background-color: #005bb5;
          color: white;
          transform: rotateY(180deg);
          z-index: 1;
        }

        .input {
          width: 90%;
          padding: 8px;
          margin-top: 10px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }

        .button {
          width: 100px;
          padding: 10px;
          margin-top: 10px;
          background-color: black;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        .button:hover {
          background-color: #333;
        }
      `}</style>
    </div>
  );
};

export default SpacedRepetitionFlashcards;