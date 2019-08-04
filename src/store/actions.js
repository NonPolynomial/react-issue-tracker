export const FETCH_PROJECTS = 'FETCH_PROJECTS';
export const SELECT_PROJECT = 'SELECT_PROJECT';
export const SELECT_TASK = 'SELECT_TASK';
export const CHANGE_VIEW = 'CHANGE_VIEW';

export const views = {
  projectOverview: 'projectOverview',
  projectsView: 'projectsView',
  taskOverview: 'taskOverview',
  taskView: 'taskView',
  fetching: 'fetching',
};

export const fetchProjects = projects => ({
  projects,
  type: FETCH_PROJECTS,
});

export const selectProject = project => ({
  project,
  type: SELECT_PROJECT,
});

export const selectTask = task => ({
  task,
  type: SELECT_TASK,
});

export const changeView = view => ({
  view,
  type: CHANGE_VIEW,
});
