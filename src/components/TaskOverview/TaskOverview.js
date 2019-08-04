import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { changeView, selectTask, views } from '../../store/actions';

import { Task } from '../../types';

import './TaskOverview.css';

const getRatio = (partial, total) => Number((partial / total) * 100).toFixed(2);

const propTypes = {
  tasks: PropTypes.arrayOf(Task).isRequired,
  onTaskSelect: PropTypes.func,
  onClose: PropTypes.func,
};

const defaultProps = {
  onTaskSelect: Function.prototype,
  onClose: Function.prototype,
};

const useCategorizedTasks = tasks => {
  const [todoTasks, setTodoTasks] = useState(tasks);
  const [progressTasks, setProgressTasks] = useState(tasks);
  const [doneTasks, setDoneTasks] = useState(tasks);

  const categorizeTasks = () => {
    setTodoTasks(tasks.filter(({ status }) => status === 'todo'));
    setProgressTasks(tasks.filter(({ status }) => status === 'progress'));
    setDoneTasks(tasks.filter(({ status }) => status === 'done'));
  };

  useEffect(() => {
    setTodoTasks(tasks.filter(({ status }) => status === 'todo'));
    setProgressTasks(tasks.filter(({ status }) => status === 'progress'));
    setDoneTasks(tasks.filter(({ status }) => status === 'done'));
  }, [tasks]);

  return {
    todoTasks,
    progressTasks,
    doneTasks,
    categorizeTasks,
  };
};

const TaskOverview = ({ tasks, onTaskSelect, onClose }) => {
  const total = tasks.length;

  const {
    todoTasks,
    progressTasks,
    doneTasks,
    categorizeTasks,
  } = useCategorizedTasks(tasks);

  return (
    <div>
      <button onClick={() => onClose()}>&times;</button>
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
                    categorizeTasks();
                  }}
                >
                  ▶
                </button>
                <button
                  onClick={() => {
                    task.status = 'done';
                    categorizeTasks();
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
                    categorizeTasks();
                  }}
                >
                  ◀
                </button>
                <button
                  onClick={() => {
                    task.status = 'done';
                    categorizeTasks();
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
                    categorizeTasks();
                  }}
                >
                  ◀
                </button>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

TaskOverview.propTypes = propTypes;
TaskOverview.defaultProps = defaultProps;

const mapDispatchToProps = dispatch => ({
  onTaskSelect: task => dispatch(selectTask(task)),
  onClose: () => dispatch(changeView(views.projectsView)),
});

export default connect(
  null,
  mapDispatchToProps
)(TaskOverview);
