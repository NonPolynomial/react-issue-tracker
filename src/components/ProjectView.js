import React, { useState } from 'react';
import PropTypes from 'prop-types';

import useForceUpdate from '../hooks/useForceUpdate';
import { Project } from '../types';

import TaskOverview from './TaskOverview';
import TaskView from './TaskView';

const propTypes = {
  project: Project.isRequired,
  onDeselect: PropTypes.func,
};

const defaultProps = {
  onDeselect: Function.prototype,
};

const ProjectView = ({ project, onDeselect }) => {
  const forceUpdate = useForceUpdate();
  const [currentTask, selectTask] = useState(null);

  let content;
  if (currentTask) {
    content = (
      <TaskView
        task={currentTask}
        onStatusChange={(task, status) => {
          task.status = status;
          forceUpdate();
        }}
        onDeselect={() => selectTask(null)}
      />
    );
  } else {
    content = (
      <div>
        <h3>Tasks</h3>
        <TaskOverview
          tasks={project.tasks}
          onTaskSelect={task => selectTask(task)}
        />
        ;
      </div>
    );
  }

  return (
    <div>
      <button onClick={() => onDeselect()}>Back to overview</button>
      <h2>Project: {project.title}</h2>
      <h3>Summary</h3>
      <p>{project.summary}</p>
      <h3>Description</h3>
      <p>{project.description}</p>
      {content}
    </div>
  );
};

ProjectView.propTypes = propTypes;
ProjectView.defaultProps = defaultProps;

export default ProjectView;
