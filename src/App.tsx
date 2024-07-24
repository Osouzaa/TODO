import { Header } from "./components/Header";
import styles from "./App.module.css";
import "./global.css";
import { ClipboardText, PlusCircle, Trash } from "@phosphor-icons/react";
import { useState, type FormEvent } from "react";

interface Task {
  id: number;
  task: string;
  status: "aberto" | "concluido";
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskWrite, setTaskWrite] = useState("");

  const handleAddTask = (e: FormEvent) => {
    e.preventDefault();
    if (taskWrite.trim() === "") return;
    const newTask: Task = {
      id: tasks.length + 1,
      task: taskWrite,
      status: "aberto",
    };
    setTasks([...tasks, newTask]);
    setTaskWrite("");
  };

  const handleToggleTaskStatus = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              status: task.status === "aberto" ? "concluido" : "aberto",
            }
          : task
      )
    );
  };

  const handleDeleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const completedTasksCount = tasks.filter(
    (task) => task.status === "concluido"
  ).length;

  const sortedTasks = [...tasks].sort((a, b) =>
    a.status === "concluido" ? 1 : -1
  );

  return (
    <>
      <Header />
      <main className={styles.wrapper}>
        <form className={styles.contentInput} onSubmit={handleAddTask}>
          <input
            type="text"
            placeholder="Adicione uma nova tarefa"
            value={taskWrite}
            onChange={(e) => setTaskWrite(e.target.value)}
          />
          <button type="submit">
            Criar
            <PlusCircle />
          </button>
        </form>

        <div className={styles.containerTask}>
          <div className={styles.contentTaksItem}>
            <p>Tarefas Criadas</p>
            <span>{tasks.length}</span>
          </div>
          <div className={styles.contentTaskDoing}>
            <p>Concluídas</p>
            <span>{completedTasksCount}</span>
          </div>
        </div>

        <div className={styles.TaskActive}>
          {tasks.length === 0 ? (
            <div className={styles.contentTask}>
              <div className={styles.contentTaskItem}>
                <ClipboardText />
                <div>
                  <p className={styles.paragraphText}>
                    Você ainda não tem tarefas cadastradas
                  </p>
                  <span>Crie tarefas e organize seus itens a fazer</span>
                </div>
              </div>
            </div>
          ) : (
            sortedTasks.map((task) => (
              <div className={styles.CardTask} key={task.id}>
                <input
                  type="radio"
                  checked={task.status === "concluido"}
                  onChange={() => handleToggleTaskStatus(task.id)}
                />
                <p
                  className={
                    task.status === "concluido" ? styles.taskCompleted : ""
                  }
                >
                  {task.task}
                </p>
                <button
                  title="Apagar uma tarefa"
                  onClick={() => handleDeleteTask(task.id)}
                >
                  <Trash />
                </button>
              </div>
            ))
          )}
        </div>
      </main>
    </>
  );
}

export default App;
