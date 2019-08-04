import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import Projects from './services/Projects';

import Layout from './components/Layout';
import ProjectOverview from './components/ProjectOverview';
import ProjectView from './components/ProjectView';
import FormProjectAdd from './components/FormProjectAdd';
import FormTaskAdd from './components/FormTaskAdd';
import TaskOverview from './components/TaskOverview';
import TaskView from './components/TaskView';

import {
  fetchProjects,
  fetchTasks,
  updateFetchStatus,
  fetchStatus,
} from './store/actions';

import './App.css';

const propTypes = {
  fetchingStatus: PropTypes.oneOf(Reflect.ownKeys(fetchStatus)).isRequired,
  dispatch: PropTypes.func,
};
const defaultProps = {
  dispatch: Function.prototype,
};

const App = ({ projects, tasks, fetchingStatus, dispatch }) => {
  useEffect(() => {
    const fetchData = async () => {
      dispatch(updateFetchStatus(fetchStatus.FETCHING));
      const result = await Projects.fetchData(500);
      dispatch(fetchProjects(result.projects));
      dispatch(fetchTasks(result.tasks));
      dispatch(updateFetchStatus(fetchStatus.DONE));
    };

    if (fetchingStatus === fetchStatus.UNSENT) {
      fetchData();
    }
  }, [fetchingStatus]);

  if (fetchingStatus !== fetchStatus.DONE) {
    return (
      <Layout>
        <p>Fetching data...</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <Switch>
        <Route path="/tasks/add" component={FormTaskAdd} />
        <Route
          path="/projects/:projectId/tasks/:taskId"
          render={({
            match: {
              params: { taskId },
            },
          }) => {
            const task = tasks.find(t => t.id === taskId);
            return <TaskView task={task} />;
          }}
        />
        <Route path="/projects/add" component={FormProjectAdd} />
        <Route
          path="/projects/:id/tasks"
          render={({
            match: {
              params: { id },
            },
            history,
          }) => {
            const filteredTasks = tasks.filter(t => t.projectId === id);
            return (
              <TaskOverview
                tasks={filteredTasks}
                onTaskSelect={task => {
                  history.push(`/projects/${id}/tasks/${task.id}`);
                }}
              />
            );
          }}
        />
        <Route
          path="/projects/:id"
          render={({
            match: {
              params: { id },
            },
          }) => {
            const project = projects.find(p => p.id === id);
            return <ProjectView project={project} />;
          }}
        />
        <Route
          render={({ history }) => (
            <ProjectOverview
              projects={projects}
              onProjectSelect={project => {
                history.push(`/projects/${project.id}`);
              }}
            />
          )}
        />
      </Switch>
    </Layout>
  );
};

App.propTypes = propTypes;
App.defaultProps = defaultProps;

const mapStateToProps = ({ projects, tasks, fetchingStatus }) => ({
  projects,
  tasks,
  fetchingStatus,
});

export default connect(mapStateToProps)(App);
