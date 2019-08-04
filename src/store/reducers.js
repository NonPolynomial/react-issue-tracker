import { combineReducers } from 'redux';

import {
  FETCH_PROJECTS,
  SELECT_PROJECT,
  SELECT_TASK,
  CHANGE_VIEW,
  views,
} from './actions';

const initialState = {
  projects: [],
  selection: {
    project: null,
    task: null,
  },
  view: views.fetching,
};

const projectsReducer = (state = initialState.projects, action) => {
  switch (action.type) {
    case FETCH_PROJECTS:
      return action.projects;
    default:
      return state;
  }
};

const selectionReducer = (state = initialState.selection, action) => {
  switch (action.type) {
    case SELECT_PROJECT:
      return {
        ...state,
        project: action.project,
      };
    case SELECT_TASK:
      return {
        ...state,
        task: action.task,
      };
    default:
      return state;
  }
};

const viewReducer = (state = initialState.view, action) => {
  switch (action.type) {
    case CHANGE_VIEW:
      return action.view;
    case FETCH_PROJECTS:
      return views.projectOverview;
    case SELECT_PROJECT:
      return action.project ? views.projectsView : views.projectOverview;
    case SELECT_TASK:
      return action.task ? views.taskView : views.taskOverview;
    default:
      return state;
  }
};

export default combineReducers({
  projects: projectsReducer,
  selection: selectionReducer,
  view: viewReducer,
});
