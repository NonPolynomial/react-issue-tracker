export const FETCH_PROJECTS = 'FETCH_PROJECTS';
export const FETCH_TASKS = 'FETCH_TASKS';
export const ADD_PROJECT = 'ADD_PROJECT';
export const ADD_TASK = 'ADD_TASK';
export const SELECT_PROJECT = 'SELECT_PROJECT';
export const SELECT_TASK = 'SELECT_TASK';
export const CHANGE_VIEW = 'CHANGE_VIEW';

export const views = {
  projectOverview: 'projectOverview',
  projectsView: 'projectsView',
  addProject: 'addProject',
  taskOverview: 'taskOverview',
  taskView: 'taskView',
  addTask: 'addTask',
  fetching: 'fetching',
};

export const fetchProjects = projects => ({
  projects,
  type: FETCH_PROJECTS,
});

export const fetchTasks = tasks => ({
  tasks,
  type: FETCH_TASKS,
});

export const addProject = project => ({
  project,
  type: ADD_PROJECT,
});

export const addTask = task => ({
  task,
  type: ADD_TASK,
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
