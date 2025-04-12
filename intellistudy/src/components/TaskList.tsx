import { useState } from "react";
import styles from "../styles/StudyPlanner.module.css";

interface StudyTask {
  id: string;
  subject: string;
  topic: string;
  deadline: string;
}

export default function StudyPlanner({ user }: { user: any }) {
  const [tasks, setTasks] = useState<StudyTask[]>([]);
  const [subject, setSubject] = useState("");
  const [topic, setTopic] = useState("");
  const [deadline, setDeadline] = useState("");

  const handleAddTask = () => {
    const newTask = {
      id: Date.now().toString(),
      subject,
      topic,
      deadline,
    };
    setTasks((prev) => [...prev, newTask]);
    // In future: Save to Firebase under user's UID
  };

  return (
    <div className={styles.container}>
      <h2>Study Planner</h2>

      <div className={styles.form}>
        <input
          className="input"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <input
          className="input"
          placeholder="Topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
        <input
          className="input"
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />
        <button className="button" onClick={handleAddTask}>
          Add Task
        </button>
      </div>

      <ul className={styles.taskList}>
        {tasks.map((task) => (
          <li key={task.id}>
            <strong>{task.subject}</strong>: {task.topic} (Due {task.deadline})
          </li>
        ))}
      </ul>
    </div>
  );
}
