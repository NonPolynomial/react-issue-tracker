import React from 'react';

import './App.css';

import Projects from './services/Projects';

import Layout from './components/Layout';
import ProjectOverview from './components/ProjectOverview';
import ProjectView from './components/ProjectView';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      projects: [],
      dataFetched: false,
      selectedProject: null,
    };
  }

  async componentDidMount() {
    const projects = await Projects.fetchData(500);
    this.setState({ projects, dataFetched: true });
  }

  render() {
    const { projects, dataFetched, selectedProject } = this.state;

    if (!dataFetched) {
      return (
        <Layout>
          <p>Fetching data...</p>
        </Layout>
      );
    }

    let content = <p>No projects found.</p>;

    if (selectedProject) {
      content = (
        <ProjectView
          project={selectedProject}
          onDeselect={() => this.setState({ selectedProject: null })}
        />
      );
    } else if (projects.length > 0) {
      content = (
        <ProjectOverview
          projects={projects}
          onProjectSelect={project =>
            this.setState({ selectedProject: project })
          }
        />
      );
    }

    return <Layout>{content}</Layout>;
  }
}

export default App;
