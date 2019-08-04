import React, { useState } from 'react';
import faker from 'faker';
import { connect } from 'react-redux';

import { addTask } from '../store/actions';

const FormTaskAdd = ({ history, dispatch, projects }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('todo');
  const [projectId, setProjectId] = useState(projects[0].id);

  return (
    <form
      onSubmit={e => {
        if (
          title !== '' &&
          description !== '' &&
          ['todo', 'progress', 'done'].includes(status) &&
          projects.map(({ id }) => id).includes(projectId)
        ) {
          dispatch(
            addTask({
              title,
              description,
              status,
              projectId,
              id: faker.random.uuid(),
            })
          );
          history.push(`/projects/${projectId}`);
        }
        e.preventDefault();
      }}
    >
      <label>
        Title:
        <input value={title} onChange={e => setTitle(e.target.value)} />
      </label>
      <br />
      <label>
        Description:
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
      </label>
      <br />
      <label>
        Status:
        <select
          value={status}
          onChange={e => setStatus(e.target.selectedOptions[0].value)}
        >
          <option>todo</option>
          <option>progress</option>
          <option>done</option>
        </select>
      </label>
      <br />
      <label>
        Project:
        <select
          value={projectId}
          onChange={e => setProjectId(e.target.selectedOptions[0].value)}
        >
          {projects.map(({ id, title }) => (
            <option key={id} value={id}>
              {title}
            </option>
          ))}
        </select>
      </label>
      <br />
      <button type="submit">Add task</button>
    </form>
  );
};

const mapState = ({ projects }) => ({ projects });

export default connect(mapState)(FormTaskAdd);
