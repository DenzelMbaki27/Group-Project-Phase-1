import { useState } from 'react'

interface FlashcardProps {
  question: string
  answer: string
}

export default function Flashcard({ question, answer }: FlashcardProps) {
  const [flipped, setFlipped] = useState(false)

  return (
    <div
      onClick={() => setFlipped(!flipped)}
      className="w-60 h-40 border bg-white shadow-md p-4 cursor-pointer flex items-center justify-center text-center rounded-xl transition-transform transform hover:scale-105"
    >
      {flipped ? answer : question}
    </div>
  )
}
