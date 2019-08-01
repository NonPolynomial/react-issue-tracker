import React from 'react';
import './ProjectOverview.css';

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

export default ProjectOverview;
