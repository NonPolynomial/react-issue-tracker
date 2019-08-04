import React from 'react';
import { connect } from 'react-redux';

import { changeView, views } from '../../store/actions';

import './Layout.css';

const Layout = ({ children, dispatch, view }) => {
  let actions = [];

  if (![views.addProject, views.addTask].includes(view)) {
    actions.push(['Add Project', () => dispatch(changeView(views.addProject))]);
    actions.push(['Add Task', () => dispatch(changeView(views.addTask))]);
  }
  if (view === views.projectsView) {
    actions.push([
      'Show Tasks assigned to this project',
      () => dispatch(changeView(views.taskOverview)),
    ]);
    actions.push([
      'Back to Projects',
      () => dispatch(changeView(views.projectOverview)),
    ]);
  } else if (view === views.taskOverview) {
    actions.push([
      'Back to selected Project',
      () => dispatch(changeView(views.projectsView)),
    ]);
  } else if (view === views.taskView) {
    actions.push([
      'Back to Tasks',
      () => dispatch(changeView(views.taskOverview)),
    ]);
    actions.push([
      'Back to selected Project',
      () => dispatch(changeView(views.projectsView)),
    ]);
  }

  return (
    <div className="layout">
      <header>
        <h1
          style={{ cursor: 'pointer' }}
          onClick={() => dispatch(changeView(views.projectOverview))}
        >
          Issue Tracker
        </h1>
        <div className="actions">
          {actions.map(([text, action]) => (
            <button onClick={action}>{text}</button>
          ))}
        </div>
      </header>
      {children}
    </div>
  );
};

const mapStateToProps = ({ view }) => ({ view });

export default connect(mapStateToProps)(Layout);
