import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import dummyTasks from "./dummyTasks";
import { Alert } from "react-native";

export type Task = {
  id: number;
  title: string;
  isFinished: boolean;
};

type TasksContextType = {
  // setTasks: (tasks: Task[]) => void;
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  setTaskFinished: (id: number) => void;
  deleteTask: (id: number) => void;
  getFilteredTasks: (tab: string, searchQuery: string) => Task[];
  addTask: (title: string) => void;
  numberOfCompletedTasks: number;
  numberOfTasks: number;
};
const TasksContext = createContext<TasksContextType>({
  setTasks: () => {},
  setTaskFinished: () => {},
  deleteTask: () => {},
  getFilteredTasks: () => [],
  addTask: () => {},
  numberOfCompletedTasks: 0,
  numberOfTasks: 0,
});

const TasksContextProvider = ({ children }: PropsWithChildren) => {
  const [isLoadDataed, setIsLoadDataed] = useState(false);
  const [tasks, setTasks] = useState<Task[]>(dummyTasks);

  const numberOfCompletedTasks = tasks.filter((task) => task.isFinished).length;
  const numberOfTasks = tasks.length;

  useEffect(() => {
    loadTasks();
  }, []);

  useEffect(() => {
    saveTasks();
  }, [tasks]);

  const saveTasks = async () => {
    if (!isLoadDataed)
      try {
        const value = JSON.stringify(tasks);
        await AsyncStorage.setItem("tasks", value);
      } catch (e) {
        console.log("🚀 ~ saveTasks ~ e:", e);
        Alert.alert("Failed to save tasks");
      }
  };

  const loadTasks = async () => {
    try {
      const value = await AsyncStorage.getItem("tasks");
      if (value !== null) {
        setTasks(JSON.parse(value));
      }
    } catch (e) {
      console.log("🚀 ~ loadTasks ~ e:", e);
      Alert.alert("Failed to load tasks");
    } finally {
      setIsLoadDataed(true);
    }
  };

  const setTaskFinished = (id: number) => {
    const newTasks = [...tasks];
    const task = newTasks.find((task) => task.id === id);
    if (task) {
      task.isFinished = !task.isFinished;
    }
    setTasks(newTasks);
  };

  const deleteTask = (id: number) => {
    const newTasks = [...tasks];
    const index = newTasks.findIndex((task) => task.id === id);
    if (index !== -1) {
      newTasks.splice(index, 1);
    }
    setTasks(newTasks);
  };

  const addTask = (title: string) => {
    setTasks((prev) => [
      ...prev,
      {
        id: new Date().getTime(),
        title,
        isFinished: false,
      },
    ]);
  };

  const getFilteredTasks = (tab: string, searchQuery: string) => {
    return tasks.filter((task) => {
      if (tab === "todo" && task.isFinished) {
        return false;
      }

      if (tab === "finished" && !task.isFinished) {
        return false;
      }

      if (!searchQuery) {
        return true;
      }

      return task.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase().trim());
    });
  };

  return (
    <TasksContext.Provider
      value={{
        setTasks,
        setTaskFinished,
        deleteTask,
        getFilteredTasks,
        addTask,
        numberOfCompletedTasks,
        numberOfTasks,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};

export const useTasks = () => useContext(TasksContext);

export default TasksContextProvider;
