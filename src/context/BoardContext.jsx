import { createContext, useState, useEffect } from "react";

export const BoardContext = createContext();

export function BoardProvider({ children }) {
const [tasks, setTasks] = useState(() => {
  const stored = localStorage.getItem("tasks");
  return stored ? JSON.parse(stored) : [];
});

const [activityLog, setActivityLog] = useState(() => {
  const stored = localStorage.getItem("activityLog");
  return stored ? JSON.parse(stored) : [];
});


  const addTask = (newTask) => {
    const taskWithId = { ...newTask, 
      id: Date.now().toString(), 
      status: "todo" ,
      createdAt: new Date().toISOString()};

    setTasks(prev => [...prev, taskWithId]);

    setActivityLog(prev => [
      {message: `🟢 Created "${newTask.title}" `, time: new Date().toISOString() },
...prev
    ]);
  };

  const deleteTask = (taskId) => {
    const taskToDelete = tasks.find(task => task.id === taskId);

    setTasks(prev => prev.filter(task => task.id !== taskId));
  
    setActivityLog(prev => [
      {message: `🔴 Deleted "${taskToDelete.title}" `, time: new Date().toISOString() },
      ...prev
    ]);
  };

  const updateTask = (updatedTask) => {
    setTasks(prev => prev.map(task => 
      task.id === updatedTask.id ? updatedTask : task
    ));

    setActivityLog(prev => [
      {message: `📝 Edited "${updatedTask.title}" `, time: new Date().toISOString() },
      ...prev
    ]);
  };

  const moveTask = (taskId, newStatus) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ));

    const movedTask = tasks.find(task => task.id === taskId);

    if (movedTask) {
    setActivityLog(prev => [
      {message: `📦 Moved "${movedTask.title}" to ${newStatus}`, time: new Date().toISOString() },
      ...prev
    ]);
  }
  };

  const resetBoard = () => {
    setTasks([]);
    setActivityLog([]);

    localStorage.removeItem("tasks");
    localStorage.removeItem("activityLog");
  };

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    useEffect(() => {
        localStorage.setItem("activityLog", JSON.stringify(activityLog));
    }, [activityLog]);

    return (
        <BoardContext.Provider value={{ tasks, addTask, deleteTask, updateTask, moveTask, activityLog, resetBoard }}>
            {children}
        </BoardContext.Provider>
    );
};


