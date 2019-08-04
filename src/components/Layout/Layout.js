import React from 'react';
import { Route, Link, withRouter } from 'react-router-dom';

import './Layout.css';

const Layout = ({ children, history }) => {
  const actions = [];
  actions.push(
    <Route render={() => <Link to="/projects/add">Add Project</Link>} />
  );
  actions.push(<Route render={() => <Link to="/tasks/add">Add Task</Link>} />);
  actions.push(
    <Route
      path="/projects/:projectId/tasks/:taskId"
      render={({
        match: {
          params: { projectId },
        },
      }) => <Link to={`/projects/${projectId}/tasks`}>Back to tasks</Link>}
    />
  );
  actions.push(
    <Route
      path="/projects/:id/tasks"
      render={({
        match: {
          params: { id },
        },
      }) => <Link to={`/projects/${id}`}>Back to selected project</Link>}
    />
  );
  actions.push(
    <Route
      exact
      path="/projects/:id"
      render={({
        match: {
          params: { id },
        },
      }) =>
        id !== 'add' && <Link to={`/projects/${id}/tasks`}>View tasks</Link>
      }
    />
  );
  actions.push(
    <Route
      path="/projects"
      render={() => <Link to="/">Back to projects</Link>}
    />
  );

  return (
    <div className="layout">
      <header>
        <h1
          style={{ cursor: 'pointer' }}
          onClick={() => {
            history.push('/');
          }}
        >
          Issue Tracker
        </h1>
        <div className="actions">{actions}</div>
      </header>
      {children}
    </div>
  );
};

export default withRouter(Layout);
