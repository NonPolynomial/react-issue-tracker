import React from 'react';

import './App.css';

import Projects from './services/Projects';

import Layout from './components/Layout';
import ProjectOverview from './components/ProjectOverview';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      projects: [],
      dataFetched: false,
    };
  }

  async componentDidMount() {
    const projects = await Projects.fetchData(500);
    this.setState({ projects, dataFetched: true });
  }

  render() {
    const { projects, dataFetched } = this.state;

    if (!dataFetched) {
      return (
        <Layout>
          <p>Fetching data...</p>
        </Layout>
      );
    }

    return (
      <Layout>
        <h2>Projects</h2>
        {projects.length > 0 ? (
          <ProjectOverview projects={projects} />
        ) : (
          <p>No projects found.</p>
        )}
      </Layout>
    );
  }
}

export default App;
