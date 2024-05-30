import { create, StoreApi, UseBoundStore } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import dummyTasks from "./dummyTasks";

type WithSelectors<S> = S extends { getState: () => infer T }
  ? S & { use: { [K in keyof T]: () => T[K] } }
  : never;

const createSelectors = <S extends UseBoundStore<StoreApi<object>>>(
  _store: S
) => {
  let store = _store as WithSelectors<typeof _store>;
  store.use = {};
  for (let k of Object.keys(store.getState())) {
    (store.use as any)[k] = () => store((s) => s[k as keyof typeof s]);
  }

  return store;
};

export type Task = {
  id: number;
  title: string;
  isFinished: boolean;
};

type Store = {
  tasks: Task[];
  numberOfCompletedTasks: () => number;
  numberOfTasks: () => number;
  addTask: (title: string) => void;
  deleteTask: (id: number) => void;
  setTaskFinished: (id: number) => void;
  getFilteredTasks: (tab: string, searchQuery: string) => Task[];
};

const store = create(
  persist<Store>(
    (set, get) => ({
      tasks: dummyTasks,
      numberOfCompletedTasks: () =>
        get().tasks.filter((task) => task.isFinished).length,
      numberOfTasks: () => get().tasks.length,
      addTask: (title) => {
        set((state) => ({
          tasks: [
            ...state.tasks,
            {
              id: new Date().getTime(),
              title,
              isFinished: false
            }
          ]
        }));
      },
      deleteTask: (id) => {
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id)
        }));
      },
      setTaskFinished: (id) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, isFinished: !task.isFinished } : task
          )
        }));
      },
      getFilteredTasks: (tab, searchQuery) => {
        const tasks = get().tasks;
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
      }
    }),
    {
      name: "tasks-store",
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
);

export const useTasksStore = createSelectors(store);
