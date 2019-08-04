import { combineReducers } from 'redux';

import {
  FETCH_PROJECTS,
  FETCH_TASKS,
  ADD_PROJECT,
  ADD_TASK,
  UPDATE_FETCH_STATUS,
  fetchStatus,
} from './actions';

const initialState = {
  projects: [],
  tasks: [],
  fetchingStatus: fetchStatus.UNSENT,
};

const projectsReducer = (state = initialState.projects, action) => {
  switch (action.type) {
    case FETCH_PROJECTS:
      return action.projects;
    case ADD_PROJECT:
      return [...state, action.project];
    default:
      return state;
  }
};

const tasksReducer = (state = initialState.tasks, action) => {
  switch (action.type) {
    case FETCH_TASKS:
      return action.tasks;
    case ADD_TASK:
      return [...state, action.task];
    default:
      return state;
  }
};

const fetchStatusReducer = (state = initialState.fetchingStatus, action) => {
  switch (action.type) {
    case UPDATE_FETCH_STATUS:
      return action.status;
    default:
      return state;
  }
};

export default combineReducers({
  projects: projectsReducer,
  tasks: tasksReducer,
  fetchingStatus: fetchStatusReducer,
});
