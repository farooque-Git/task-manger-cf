import React from 'react';

function TaskTable({ tasks }) {
  return (
    <table className="min-w-full table-auto">
      <thead>
        <tr className="bg-gray-100">
          <th className="py-2 px-4 text-left">Task ID</th>
          <th className="py-2 px-4 text-left">Task Name</th>
          <th className="py-2 px-4 text-left">Status</th>
          <th className="py-2 px-4 text-left">Created At</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task, index) => (
          <tr key={task.id} className="border-t">
            <td className="py-2 px-4">{task.id}</td>
            <td className="py-2 px-4">{task.name}</td>
            <td className="py-2 px-4">{task.status}</td>
            <td className="py-2 px-4">{task.createdAt}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TaskTable;
