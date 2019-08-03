import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Task } from '../../types';

import './TaskOverview.css';

const getRatio = (partial, total) => Number((partial / total) * 100).toFixed(2);

const propTypes = {
  tasks: PropTypes.arrayOf(Task).isRequired,
  onTaskSelect: PropTypes.func,
};

const defaultProps = {
  onTaskSelect: Function.prototype,
};

const TaskOverview = ({ tasks, onTaskSelect }) => {
  const total = tasks.length;

  const [todoTasks, setTodoTasks] = useState(tasks);
  const [progressTasks, setProgressTasks] = useState(tasks);
  const [doneTasks, setDoneTasks] = useState(tasks);

  useEffect(() => {
    console.log('effect');
    setTodoTasks(tasks.filter(({ status }) => status === 'todo'));
    setProgressTasks(tasks.filter(({ status }) => status === 'progress'));
    setDoneTasks(tasks.filter(({ status }) => status === 'done'));
  });

  return (
    <div className="task-overview__container">
      <div className="task-overview_column">
        <h4>
          Todo ({todoTasks.length} | {getRatio(todoTasks.length, total)}%)
        </h4>
        <div className="task-overview__tasks">
          {todoTasks.map(task => (
            <article key={task.id} className="task-overview_item">
              <h4 onClick={() => onTaskSelect(task)}>{task.title}</h4>
              <button
                onClick={() => {
                  task.status = 'progress';
                }}
              >
                ▶
              </button>
              <button
                onClick={() => {
                  task.status = 'done';
                }}
              >
                ✔
              </button>
            </article>
          ))}
        </div>
      </div>
      <div className="task-overview_column">
        <h4>
          In Progress ({progressTasks.length} |{' '}
          {getRatio(progressTasks.length, total)}%)
        </h4>
        <div className="task-overview__tasks">
          {progressTasks.map(task => (
            <article key={task.id} className="task-overview_item">
              <h4 onClick={() => onTaskSelect(task)}>{task.title}</h4>
              <button
                onClick={() => {
                  task.status = 'todo';
                }}
              >
                ◀
              </button>
              <button
                onClick={() => {
                  task.status = 'done';
                }}
              >
                ✔
              </button>
            </article>
          ))}
        </div>
      </div>
      <div className="task-overview_column">
        <h4>
          Done ({doneTasks.length} | {getRatio(doneTasks.length, total)}%)
        </h4>
        <div className="task-overview__tasks">
          {doneTasks.map(task => (
            <article key={task.id} className="task-overview_item">
              <h4 onClick={() => onTaskSelect(task)}>{task.title}</h4>
              <button
                onClick={() => {
                  task.status = 'progress';
                }}
              >
                ◀
              </button>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

TaskOverview.propTypes = propTypes;
TaskOverview.defaultProps = defaultProps;

export default TaskOverview;
