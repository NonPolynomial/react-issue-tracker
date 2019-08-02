import React from 'react';
import PropTypes from 'prop-types';

import './ProjectOverview.css';

import { Project } from '../../types';

const propTypes = {
  projects: PropTypes.arrayOf(Project).isRequired,
  onProjectSelect: PropTypes.func,
};

const defaultProps = {
  onProjectSelect: Function.prototype,
};

const ProjectOverview = ({ projects, onProjectSelect }) => (
  <div>
    <h2>Projects</h2>
    <div className="project-overview__container">
      {projects.map(project => (
        <article
          key={project.id}
          className="project-overview__item"
          onClick={() => onProjectSelect(project)}
        >
          <h3>{project.title}</h3>
          <p>{project.summary}</p>
        </article>
      ))}
    </div>
  </div>
);

ProjectOverview.propTypes = propTypes;
ProjectOverview.defaultProps = defaultProps;

export default ProjectOverview;
