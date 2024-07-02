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
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  useEffect(() => {
    // Apply filters based on activeTab
    let filtered = tasks;

    switch (activeTab) {
      case "completed":
        filtered = tasks.filter((task) => task.completed);
        break;
      case "backlogs":
        filtered = tasks.filter(
          (task) => !task.completed && isTaskOverdue(task)
        );
        break;
      case "upcoming":
        filtered = tasks.filter(
          (task) =>
            !task.completed && !isTaskOverdue(task) && isTaskUpcoming(task)
        );
        break;
      default:
        break;
    }

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter((task) =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredTasks(filtered);
  }, [tasks, activeTab, searchQuery]);

  const isTaskOverdue = (task) => {
    const dueDate = new Date(task.dueDate).setHours(0, 0, 0, 0); // Start of due date
    const today = new Date().setHours(0, 0, 0, 0); // Start of today
    return dueDate < today;
  };

  const isTaskUpcoming = (task) => {
    const dueDate = new Date(task.dueDate).setHours(0, 0, 0, 0); // Start of due date
    const today = new Date().setHours(0, 0, 0, 0); // Start of today
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
      <h1 className="text-center text-4xl p-2 border-4 border-orange-800 text-white">
        Tasked
      </h1>
      <div className="mt-3">
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 mt-2 border rounded-md"
        />
      </div>
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
