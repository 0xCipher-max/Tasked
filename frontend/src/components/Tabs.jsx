import React from "react";

const Tabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex justify-center space-x-4">
      <button
        className={`btn-tab p-2 border-b-2 ${
          activeTab === "all" ? "border-red-600" : "border-transparent"
        }`}
        onClick={() => setActiveTab("all")}
      >
        All Tasks
      </button>
      <button
        className={`btn-tab p-2 border-b-2 ${
          activeTab === "completed" ? "border-red-600" : "border-transparent"
        }`}
        onClick={() => setActiveTab("completed")}
      >
        Completed
      </button>
      <button
        className={`btn-tab p-2 border-b-2 ${
          activeTab === "backlogs" ? "border-red-600" : "border-transparent"
        }`}
        onClick={() => setActiveTab("backlogs")}
      >
        Backlogs
      </button>
      <button
        className={`btn-tab p-2 border-b-2 ${
          activeTab === "upcoming" ? "border-red-600" : "border-transparent"
        }`}
        onClick={() => setActiveTab("upcoming")}
      >
        Upcoming
      </button>
    </div>
  );
};

export default Tabs;
