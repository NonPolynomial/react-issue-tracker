import React from 'react';
import PropTypes from 'prop-types';

import './TaskOverview.css';

import { Task } from '../../types';

const propTypes = {
  tasks: PropTypes.arrayOf(Task).isRequired,
  onTaskSelect: PropTypes.func,
};

const defaultProps = {
  onTaskSelect: Function.prototype,
};

class TaskOverview extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      todo: props.tasks,
      progress: [],
      done: [],
      total: 0,
    };
  }

  componentDidMount() {
    this.categorizeTasks();
  }

  categorizeTasks() {
    this.setState({
      todo: this.props.tasks.filter(({ status }) => status === 'todo'),
      progress: this.props.tasks.filter(({ status }) => status === 'progress'),
      done: this.props.tasks.filter(({ status }) => status === 'done'),
      total: this.props.tasks.length,
    });
  }

  moveTask(task, status) {
    task.status = status;
    this.categorizeTasks();
  }

  static getRatio(partial, total) {
    return Number((partial / total) * 100).toFixed(2);
  }

  render() {
    const { onTaskSelect } = this.props;
    const { todo, progress, done, total } = this.state;
    return (
      <div className="task-overview__container">
        <div className="task-overview_column">
          <h4>
            Todo ({todo.length} | {TaskOverview.getRatio(todo.length, total)}%)
          </h4>
          <div className="task-overview__tasks">
            {todo.map(task => (
              <article key={task.id} className="task-overview_item">
                <h4 onClick={() => onTaskSelect(task)}>{task.title}</h4>
                <button onClick={() => this.moveTask(task, 'progress')}>
                  ▶
                </button>
                <button onClick={() => this.moveTask(task, 'done')}>✔</button>
              </article>
            ))}
          </div>
        </div>
        <div className="task-overview_column">
          <h4>
            In Progress ({progress.length} |{' '}
            {TaskOverview.getRatio(progress.length, total)}%)
          </h4>
          <div className="task-overview__tasks">
            {progress.map(task => (
              <article key={task.id} className="task-overview_item">
                <h4 onClick={() => onTaskSelect(task)}>{task.title}</h4>
                <button onClick={() => this.moveTask(task, 'todo')}>◀</button>
                <button onClick={() => this.moveTask(task, 'done')}>✔</button>
              </article>
            ))}
          </div>
        </div>
        <div className="task-overview_column">
          <h4>
            Done ({done.length} | {TaskOverview.getRatio(done.length, total)}%)
          </h4>
          <div className="task-overview__tasks">
            {done.map(task => (
              <article key={task.id} className="task-overview_item">
                <h4 onClick={() => onTaskSelect(task)}>{task.title}</h4>
                <button onClick={() => this.moveTask(task, 'progress')}>
                  ◀
                </button>
              </article>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

TaskOverview.propTypes = propTypes;
TaskOverview.defaultProps = defaultProps;

export default TaskOverview;
