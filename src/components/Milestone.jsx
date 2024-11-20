import React from "react";
import { TaskCard } from "./Task";
// import { TaskCard } from "./TaskCard"; // Create a TaskCard component

export function MilestoneGroup({ title }) {
  return (
    <section className="bg-white rounded-lg shadow p-4">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <div className="space-y-4">
        <TaskCard status="OVERDUE" />
        <TaskCard status="PENDING" />
        <TaskCard status="DONE" />
      </div>
    </section>
  );
}
