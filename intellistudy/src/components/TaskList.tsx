import { useState } from 'react'

export default function TaskList() {
  const [tasks, setTasks] = useState([
    { text: 'Read Chapter 3', done: false },
    { text: 'Review Notes', done: false },
    { text: 'Watch Lecture 5', done: false },
  ])

  const toggleTask = (index: number) => {
    const updated = [...tasks]
    updated[index].done = !updated[index].done
    setTasks(updated)
  }

  return (
    <ul className="space-y-2">
      {tasks.map((task, i) => (
        <li key={i} className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={task.done}
            onChange={() => toggleTask(i)}
          />
          <span className={task.done ? 'line-through text-gray-500' : ''}>
            {task.text}
          </span>
        </li>
      ))}
    </ul>
  )
}
