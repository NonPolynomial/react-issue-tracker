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
    };
  }

  async componentDidMount() {
    const projects = await Projects.fetchData();
    this.setState({ projects });
  }

  render() {
    const { projects } = this.state;
    return (
      <Layout>
        <h2>Projects</h2>
        <ProjectOverview projects={projects} />
      </Layout>
    );
  }
}

export default App;
