import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { changeView, selectProject, views } from '../store/actions';

import { Project } from '../types';

const propTypes = {
  project: Project.isRequired,
  onTaskListOpen: PropTypes.func,
  onDeselect: PropTypes.func,
};

const defaultProps = {
  onTaskListOpen: Function.prototype,
  onDeselect: Function.prototype,
};

const ProjectView = ({ project, onDeselect, onTaskListOpen }) => {
  return (
    <div>
      <button onClick={() => onTaskListOpen()}>open task list</button>
      <button onClick={() => onDeselect()}>Back to overview</button>
      <h2>Project: {project.title}</h2>
      <h3>Summary</h3>
      <p>{project.summary}</p>
      <h3>Description</h3>
      <p>{project.description}</p>
    </div>
  );
};

ProjectView.propTypes = propTypes;
ProjectView.defaultProps = defaultProps;

const mapDispatchToProps = dispatch => ({
  onDeselect: () => dispatch(selectProject(null)),
  onTaskListOpen: () => dispatch(changeView(views.taskOverview)),
});

export default connect(
  null,
  mapDispatchToProps
)(ProjectView);
