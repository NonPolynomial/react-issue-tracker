import React from 'react';

import TaskOverview from './TaskOverview';
import TaskView from './TaskView';

class ProjectView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedTask: null,
    };
  }

  render() {
    const { project, onDeselect } = this.props;
    const { selectedTask } = this.state;

    let content;
    if (selectedTask) {
      content = (
        <TaskView
          task={selectedTask}
          onStatusChange={(task, status) => {
            task.status = status;
            this.forceUpdate();
          }}
          onDeselect={() => this.setState({ selectedTask: null })}
        />
      );
    } else {
      content = (
        <div>
          <h3>Tasks</h3>
          <TaskOverview
            tasks={project.tasks}
            onTaskSelect={task => this.setState({ selectedTask: task })}
          />
        </div>
      );
    }

    return (
      <div>
        <button onClick={() => onDeselect()}>Back to overview</button>
        <h2>Project: {project.title}</h2>
        <h3>Summary</h3>
        <p>{project.summary}</p>
        <h3>Description</h3>
        <p>{project.description}</p>
        {content}
      </div>
    );
  }
}

export default ProjectView;
