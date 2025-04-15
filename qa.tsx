// pages/index.tsx

import { useState } from 'react';
import Navbar from '../components/Navbar'; // Import the Navbar component
import styles from '../styles/qa.module.css'; // Import the CSS module

export default function Home() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle form submission by sending the question to the API
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setAnswer('');
    try {
      const res = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
      });
      const data = await res.json();
      if (data.answer) {
        setAnswer(data.answer);
      } else {
        setAnswer('No answer received');
      }
    } catch (error) {
      setAnswer('An error occurred while fetching the answer.');
    }
    setLoading(false);
  };

  // Uses the browser's Speech Recognition (Web Speech API) for voice input
  const startListening = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.lang = 'en-US';
      recognition.onresult = (event: any) => {
        const spokenText = event.results[0][0].transcript;
        setQuestion(spokenText);
      };
      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event);
      };
      recognition.start();
    } else {
      alert('Voice recognition is not supported in this browser.');
    }
  };

  // Uses browser's SpeechSynthesis to speak the answer out loud
  const speakAnswer = () => {
    if ('speechSynthesis' in window && answer) {
      const utterance = new SpeechSynthesisUtterance(answer);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <>
      <Navbar /> {/* Add the Navbar component */}
      <div className={styles.container}>
        <h1 className={styles.title}>Smart Q&A Bot</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label htmlFor="question" className={styles.label}>
            Enter your question:
          </label>
          <textarea
            id="question"
            placeholder="Ask an academic question, e.g., 'Explain while loops in Java'"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className={styles.textarea}
          />
          <div className={styles.buttonContainer}>
            <button
              type="submit"
              className={styles.button}
              disabled={loading}
            >
              {loading ? 'Thinking...' : 'Ask Question'}
            </button>
            <button
              type="button"
              onClick={startListening}
              className={styles.voiceButton}
            >
              Use Voice Command
            </button>
          </div>
        </form>
        {answer && (
          <div className={styles.answerContainer}>
            <h2 className={styles.answerTitle}>Answer:</h2>
            <p className={styles.answerText}>{answer}</p>
            <button
              onClick={speakAnswer}
              className={styles.speakButton}
            >
              Listen to Answer
            </button>
          </div>
        )}
      </div>
    </>
  );
}
