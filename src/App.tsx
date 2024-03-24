import { useState } from "react";
import { Button } from "./components/Button";
import { Header } from "./components/Header";
import { Input } from "./components/Input";
import { Empty } from "./components/List/Empty";
import { Header as ListHeader } from "./components/List/Header";
import { Item } from "./components/List/Item";
import styles from "./App.module.css";
import { PlusCircle } from "@phosphor-icons/react";

export interface ITask {
  id: number;
  content: string;
  isCompleted: boolean;
}

function App() {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [textValue, setTextValue] = useState("");

  const checkedTasksCounter = tasks.reduce((prevValue, currentTask) => {
    if (currentTask.isCompleted) {
      return prevValue + 1;
    }

    return prevValue;
  }, 0);

  function handleAddTask() {
    if (!textValue) {
      return;
    }

    const newTask: ITask = {
      id: new Date().getTime(),
      content: textValue,
      isCompleted: false,
    };

    setTasks((state) => [...state, newTask]);
    setTextValue("");
  }

  function handleDeleteTask(id: number) {
    const filteredTasks = tasks.filter((task) => task.id !== id);

    if (!confirm("Deseja mesmo apagar esta tarefa?")) {
      return;
    }

    setTasks(filteredTasks);
  }

  function handleToggleTask({ id, value }: { id: number; value: boolean }) {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, isCompleted: value };
      }

      return { ...task };
    });

    setTasks(updatedTasks);
  }

  return (
    <main>
      <Header />

      <section className={styles.content}>
        <div className={styles.taskInfoContainer}>
          <Input
            onChange={(e) => setTextValue(e.target.value)}
            value={textValue}
          />
          <Button onClick={handleAddTask}>
            Criar
            <PlusCircle size={16} color="#f2f2f2" weight="bold" />
          </Button>
        </div>

        <div className={styles.tasksList}>
          <ListHeader
            tasksCounter={tasks.length}
            checkedTasksCounter={checkedTasksCounter}
          />

          {tasks.length > 0 ? (
            <div>
              {tasks.map((task) => (
                <Item
                  key={task.id}
                  data={task}
                  removeTask={handleDeleteTask}
                  toggleTaskStatus={handleToggleTask}
                />
              ))}
            </div>
          ) : (
            <Empty />
          )}
        </div>
      </section>
    </main>
  );
}

export default App;
