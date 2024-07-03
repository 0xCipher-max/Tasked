import React, { useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import dayjs from "dayjs";

const TaskList = ({ tasks, openModal }) => {
  const { deleteTask, markCompleted, markInCompleted } =
    useContext(TaskContext);

  const handleDelete = async (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      await deleteTask(taskId);
    }
  };

  const handleMarkCompleted = async (taskId) => {
    await markCompleted(taskId);
  };
  const handleMarkInCompleted = async (taskId) => {
    await markInCompleted(taskId);
  };

  const getTaskClassName = (task) => {
    const today = dayjs().format("YYYY-MM-DD");
    if (task.completed) {
      return "bg-green-200";
    } else if (task.dueDate === today) {
      return "bg-yellow-200";
    } else if (dayjs(task.dueDate).isBefore(today)) {
      return "bg-red-200";
    } else {
      return "bg-white";
    }
  };

  return (
    <>
      <div className="m-8">
        {tasks.length === 0 ? (
          <p className="text-white">No tasks. Add one!</p>
        ) : (
          tasks.map((task) => (
            <div
              key={task._id}
              className={`task-item border p-4 mb-4 ${getTaskClassName(task)}`}
            >
              <p>Title: {task.title}</p>
              <p>Description: {task.description}</p>
              <p>Due Date: {task.dueDate}</p>
              <div className="mt-2">
                <button
                  className="btn-edit mr-2 p-2 rounded-lg"
                  onClick={() => openModal(task)}
                >
                  Edit
                </button>
                <button
                  className="btn-delete mr-2 p-2 rounded-lg"
                  onClick={() => handleDelete(task._id)}
                >
                  Delete
                </button>
                {!task.completed && (
                  <button
                    className="btn-mark-completed p-2 rounded-lg"
                    onClick={() => handleMarkCompleted(task._id)}
                  >
                    Mark as Completed
                  </button>
                )}
                {task.completed && (
                  <button
                    className="btn-mark-completed p-2 rounded-lg"
                    onClick={() => handleMarkInCompleted(task._id)}
                  >
                    Mark as InComplete
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
      <div className="add-button m-8">
        <button
          className="btn-mark-completed p-2 rounded-lg mb-5"
          onClick={() => openModal()}
        >
          Add Task
        </button>
      </div>
    </>
  );
};

export default TaskList;
