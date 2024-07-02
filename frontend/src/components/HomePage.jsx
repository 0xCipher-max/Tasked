import React, { useContext, useEffect, useState } from "react";
import Tabs from "./Tabs";
import TaskList from "./TaskList";
import { TaskContext } from "../context/TaskContext";
import Loader from "./Loader";
import Modal from "./Modal";

const HomePage = () => {
  const { tasks, fetchTasks } = useContext(TaskContext);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [activeTab, setActiveTab] = useState("all"); // Default to show all tasks
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  useEffect(() => {
    // Apply filters based on activeTab
    switch (activeTab) {
      case "completed":
        setFilteredTasks(tasks.filter((task) => task.completed));
        break;
      case "backlogs":
        setFilteredTasks(
          tasks.filter((task) => !task.completed && isTaskOverdue(task))
        );
        break;
      case "upcoming":
        setFilteredTasks(
          tasks.filter(
            (task) =>
              !task.completed && !isTaskOverdue(task) && isTaskUpcoming(task)
          )
        );
        break;
      default:
        setFilteredTasks(tasks);
        break;
    }
  }, [tasks, activeTab]);

  const isTaskOverdue = (task) => {
    const dueDate = new Date(task.dueDate);
    const today = new Date();
    return dueDate < today;
  };

  const isTaskUpcoming = (task) => {
    const dueDate = new Date(task.dueDate);
    const today = new Date();
    return dueDate >= today;
  };

  const openModal = (task = null) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setEditingTask(null);
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto mt-8">
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      {tasks ? (
        <TaskList tasks={filteredTasks} openModal={openModal} />
      ) : (
        <Loader />
      )}
      <Modal
        isOpen={isModalOpen}
        closeModal={closeModal}
        isEditing={editingTask !== null}
        initialTask={editingTask}
      />
    </div>
  );
};

export default HomePage;
