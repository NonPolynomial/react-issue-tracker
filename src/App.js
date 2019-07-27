import React from 'react';
import faker from 'faker';

import './App.css';

import Layout from './components/Layout';
import ProjectOverview from './components/ProjectOverview';

const projects = Array.from({ length: 7 }, () => ({
  id: faker.random.uuid(),
  title: faker.company.companyName(),
  description: faker.lorem.paragraph(),
}));

class App extends React.Component {
  render() {
    return (
      <Layout>
        <h2>Projects</h2>
        <ProjectOverview projects={projects} />
      </Layout>
    );
  }
}

export default App;
