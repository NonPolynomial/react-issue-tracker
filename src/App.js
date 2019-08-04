import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Projects from './services/Projects';

import Layout from './components/Layout';
import ProjectOverview from './components/ProjectOverview';
import ProjectView from './components/ProjectView';
import FormProjectAdd from './components/FormProjectAdd';
import FormTaskAdd from './components/FormTaskAdd';
import TaskOverview from './components/TaskOverview';
import TaskView from './components/TaskView';

import { fetchProjects, fetchTasks, views } from './store/actions';

import { Project, Task } from './types';

import './App.css';

const propTypes = {
  projects: PropTypes.arrayOf(Project).isRequired,
  tasks: PropTypes.arrayOf(Task).isRequired,
  view: PropTypes.oneOf(Reflect.ownKeys(views)).isRequired,
  currentProject: Project,
  selectedTask: Task,
  onDataFetched: PropTypes.func,
};
const defaultProps = {
  onDataFetched: Function.prototype,
  currentProject: null,
  selectedTask: null,
};

const App = ({
  projects,
  tasks,
  currentProject,
  selectedTask,
  view,
  onDataFetched,
}) => {
  useEffect(() => {
    const fetchProjects = async () => {
      const result = await Projects.fetchData(500);
      onDataFetched(result);
    };

    if (view === views.fetching) {
      fetchProjects();
    }
  }, [view, onDataFetched]);

  if (view === views.fetching) {
    return (
      <Layout>
        <p>Fetching data...</p>
      </Layout>
    );
  }

  let content;
  if (view === views.addTask) {
    content = <FormTaskAdd />;
  } else if (view === views.taskView) {
    content = (
      <TaskView
        task={selectedTask}
        onStatusChange={(task, status) => {
          task.status = status;
        }}
      />
    );
  } else if (view === views.taskOverview) {
    const filteredTasks = tasks.filter(
      ({ projectId }) => projectId === currentProject.id
    );
    content = <TaskOverview tasks={filteredTasks} />;
  } else if (view === views.addProject) {
    content = <FormProjectAdd />;
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

const mapStateToProps = ({
  projects,
  tasks,
  selection: { project, task },
  view,
}) => ({
  projects,
  tasks,
  currentProject: project,
  selectedTask: task,
  view,
});
const mapDispatchToProps = dispatch => ({
  onDataFetched: ({ projects, tasks }) => {
    dispatch(fetchProjects(projects));
    dispatch(fetchTasks(tasks));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
