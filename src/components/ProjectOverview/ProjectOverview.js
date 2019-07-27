import React from 'react';
import './ProjectOverview.css';

const ProjectOverview = ({ projects }) => (
  <div className="project-overview__container">
    {projects.map(project => (
      <article key={project.id} className="project-overview__item">
        <h3>{project.title}</h3>
        <p>{project.summary}</p>
      </article>
    ))}
  </div>
);

export default ProjectOverview;
