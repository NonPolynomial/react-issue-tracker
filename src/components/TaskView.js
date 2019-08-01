import React from 'react';

const TaskView = ({ task, onStatusChange, onDeselect }) => {
  return (
    <div>
      <button onClick={() => onDeselect()}>Back to task overview</button>
      <h3>Task: {task.title}</h3>
      <h4>Description</h4>
      <p>{task.description}</p>
      <h4>Status</h4>
      <select
        value={task.status}
        onChange={e => onStatusChange(task, e.target.selectedOptions[0].value)}
      >
        <option>todo</option>
        <option>progress</option>
        <option>done</option>
      </select>
    </div>
  );
};

export default TaskView;
