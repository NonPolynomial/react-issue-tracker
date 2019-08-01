import React from 'react';

const ProjectView = ({ project, onDeselect }) => {
  const tasks = {
    all: project.tasks,
    todo: project.tasks.filter(({ status }) => status === 'todo'),
    progress: project.tasks.filter(({ status }) => status === 'progress'),
    done: project.tasks.filter(({ status }) => status === 'done'),
  };

  return (
    <div>
      <button onClick={() => onDeselect()}>Back to overview</button>
      <h2>Project: {project.title}</h2>
      <h3>Summary</h3>
      <p>{project.summary}</p>
      <h3>Description</h3>
      <p>{project.description}</p>
      <h3>Tasks</h3>
      <dl>
        <dt>Todo</dt>
        <dd>
          {tasks.todo.length} (
          {Number((tasks.todo.length / tasks.all.length) * 100).toFixed(0)}%)
        </dd>
        <dt>In Progress</dt>
        <dd>
          {tasks.progress.length} (
          {Number((tasks.progress.length / tasks.all.length) * 100).toFixed(0)}
          %)
        </dd>
        <dt>Done</dt>
        <dd>
          {tasks.done.length} (
          {Number((tasks.done.length / tasks.all.length) * 100).toFixed(0)}%)
        </dd>
        <dt>total</dt>
        <dd>{tasks.all.length}</dd>
      </dl>
    </div>
  );
};

export default ProjectView;
