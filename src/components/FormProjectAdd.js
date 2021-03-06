import React, { useState } from 'react';
import faker from 'faker';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { addProject } from '../store/actions';

const FormProjectAdd = ({ history, dispatch }) => {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [description, setDescription] = useState('');

  return (
    <form
      onSubmit={e => {
        if (title !== '' && summary !== '' && description !== '') {
          dispatch(
            addProject({
              title,
              summary,
              description,
              id: faker.random.uuid(),
            })
          );
          history.push('/');
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
        Summary:
        <input value={summary} onChange={e => setSummary(e.target.value)} />
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
      <button type="submit">Add project</button>
    </form>
  );
};

export default withRouter(connect()(FormProjectAdd));
