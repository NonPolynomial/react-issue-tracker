export const FETCH_PROJECTS = 'FETCH_PROJECTS';
export const FETCH_TASKS = 'FETCH_TASKS';
export const ADD_PROJECT = 'ADD_PROJECT';
export const ADD_TASK = 'ADD_TASK';
export const UPDATE_FETCH_STATUS = 'UPDATE_FETCH_STATUS';

export const fetchStatus = {
  UNSENT: 'UNSENT',
  FETCHING: 'FETCHING',
  DONE: 'DONE',
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

export const updateFetchStatus = status => ({
  status,
  type: UPDATE_FETCH_STATUS,
});
