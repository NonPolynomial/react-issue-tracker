import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Project } from '../types';

const propTypes = {
  project: Project.isRequired,
};

const defaultProps = {};

const ProjectView = ({ project }) => (
  <div>
    {project && (
      <div>
        <h2>Project: {project.title}</h2>
        <h3>Summary</h3>
        <p>{project.summary}</p>
        <h3>Description</h3>
        <p>{project.description}</p>
      </div>
    )}
  </div>
);

ProjectView.propTypes = propTypes;
ProjectView.defaultProps = defaultProps;

const mapStateToProps = ({ projects }) => {
  return { projects };
};

export default connect(mapStateToProps)(ProjectView);
