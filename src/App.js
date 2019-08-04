import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Projects from './services/Projects';

import Layout from './components/Layout';
import ProjectOverview from './components/ProjectOverview';
import ProjectView from './components/ProjectView';
import TaskOverview from './components/TaskOverview';
import TaskView from './components/TaskView';

import { fetchProjects, views } from './store/actions';

import { Project, Task } from './types';

import './App.css';

const propTypes = {
  projects: PropTypes.arrayOf(Project).isRequired,
  view: PropTypes.oneOf(Reflect.ownKeys(views)).isRequired,
  currentProject: Project,
  selectedTask: Task,
  onProjectsFetched: PropTypes.func,
};
const defaultProps = {
  onProjectsFetched: Function.prototype,
  currentProject: null,
  selectedTask: null,
};

const App = ({
  projects,
  currentProject,
  selectedTask,
  view,
  onProjectsFetched,
}) => {
  useEffect(() => {
    const fetchProjects = async () => {
      const result = await Projects.fetchData(500);
      onProjectsFetched(result);
    };

    if (view === views.fetching) {
      fetchProjects();
    }
  }, [view, onProjectsFetched]);

  if (view === views.fetching) {
    return (
      <Layout>
        <p>Fetching data...</p>
      </Layout>
    );
  }

  let content;
  if (view === views.taskView) {
    content = (
      <TaskView
        task={selectedTask}
        onStatusChange={(task, status) => {
          task.status = status;
        }}
      />
    );
  } else if (view === views.taskOverview) {
    content = <TaskOverview tasks={currentProject.tasks} />;
  } else if (view === views.projectsView) {
    content = <ProjectView project={currentProject} />;
  } else if (view === views.projectOverview) {
    if (projects.length > 0) {
      content = <ProjectOverview projects={projects} />;
    } else {
      content = <p>No projects found.</p>;
    }
  }

  return <Layout>{content}</Layout>;
};

App.propTypes = propTypes;
App.defaultProps = defaultProps;

const mapStateToProps = ({ projects, selection: { project, task }, view }) => ({
  projects,
  currentProject: project,
  selectedTask: task,
  view,
});
const mapDispatchToProps = dispatch => ({
  onProjectsFetched: projects => dispatch(fetchProjects(projects)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
