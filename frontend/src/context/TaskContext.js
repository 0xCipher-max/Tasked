import React, { createContext, useState, useEffect } from "react";

const TaskContext = createContext();

const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch(
        "https://backend-0xcipher-max-0xciphermaxs-projects.vercel.app/api/tasks"
      );
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const addTask = async (newTask) => {
    try {
      const response = await fetch(
        "https://backend-0xcipher-max-0xciphermaxs-projects.vercel.app/api/tasks",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newTask),
        }
      );
      const data = await response.json();
      setTasks([...tasks, data]);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const editTask = async (taskId, updatedTask) => {
    try {
      const response = await fetch(
        `https://backend-0xcipher-max-0xciphermaxs-projects.vercel.app/${taskId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedTask),
        }
      );
      const data = await response.json();
      const updatedTasks = tasks.map((task) =>
        task._id === taskId ? data : task
      );
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Error editing task:", error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      console.log(taskId);
      await fetch(
        `https://backend-0xcipher-max-0xciphermaxs-projects.vercel.app/api/tasks/${taskId}`,
        {
          method: "DELETE",
        }
      );
      const updatedTasks = tasks.filter((task) => task._id !== taskId);
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const markCompleted = async (taskId) => {
    try {
      console.log(taskId);

      const updatedTask = {
        ...tasks.find((task) => task._id === taskId),
        completed: true,
      };
      await editTask(taskId, updatedTask);
    } catch (error) {
      console.error("Error marking task as completed:", error);
    }
  };

  const markInCompleted = async (taskId) => {
    try {
      console.log(taskId);
      const updatedTask = {
        ...tasks.find((task) => task._id === taskId),
        completed: false,
      };
      await editTask(taskId, updatedTask);
    } catch (error) {
      console.error("Error marking task as Incompleted:", error);
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        fetchTasks,
        addTask,
        editTask,
        deleteTask,
        markCompleted,
        markInCompleted,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export { TaskContext, TaskProvider };
