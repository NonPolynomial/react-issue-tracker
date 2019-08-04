import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { selectProject } from '../store/actions';

import { Project } from '../types';

const propTypes = {
  project: Project.isRequired,
  onDeselect: PropTypes.func,
};

const defaultProps = {
  onDeselect: Function.prototype,
};

const ProjectView = ({ project, onDeselect }) => {
  return (
    <div>
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
});

export default connect(
  null,
  mapDispatchToProps
)(ProjectView);
