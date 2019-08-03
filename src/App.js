import React, { useState, useEffect } from 'react';

import Projects from './services/Projects';

import Layout from './components/Layout';
import ProjectOverview from './components/ProjectOverview';
import ProjectView from './components/ProjectView';

import './App.css';

const App = () => {
  const [projects, setProjects] = useState([]);
  const [fetchStatus, updateFetchStatus] = useState('unsent');
  const [currentProject, selectProject] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      const result = await Projects.fetchData(500);
      setProjects(result);
      updateFetchStatus('done');
    };

    if (fetchStatus === 'unsent') {
      fetchProjects();
      updateFetchStatus('fetching');
    }
  }, [fetchStatus]);

  if (fetchStatus !== 'done') {
    return (
      <Layout>
        <p>Fetching data...</p>
      </Layout>
    );
  }

  let content = <p>No projects found.</p>;

  if (currentProject) {
    content = (
      <ProjectView
        project={currentProject}
        onDeselect={() => selectProject(null)}
      />
    );
  } else if (projects.length > 0) {
    content = (
      <ProjectOverview
        projects={projects}
        onProjectSelect={project => selectProject(project)}
      />
    );
  }

  return <Layout>{content}</Layout>;
};

export default App;
