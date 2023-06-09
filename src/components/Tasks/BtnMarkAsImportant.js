import React, { useState } from 'react';
import { ReactComponent as StarLine } from '../../assets/star-line.svg';
import axios from 'axios';
import { UPDATE_TASK } from '../../endpoints';

const BtnMarkAsImportant = ({ taskId, taskImportant }) => {
  const [important, setImportant] = useState(taskImportant);

  const markAsImportantHandler = async () => {
    const aux = !important;
    setImportant(aux);

    const jwt = localStorage.getItem('access_token');
    const index = UPDATE_TASK.indexOf('{');
    const endpoint = UPDATE_TASK.slice(0, index) + taskId;

    try {
      await axios.put(
        endpoint,
        {
          important: aux,
        },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button
      title={important ? 'unmark as important' : 'mark as important'}
      onClick={markAsImportantHandler}
      className='transition hover:text-slate-700 dark:hover:text-slate-200 ml-auto'
    >
      <StarLine
        className={`w-5 h-5 sm:w-6 sm:h-6 ${
          important ? 'fill-rose-500 stroke-rose-500 ' : 'fill-none'
        }`}
      />
    </button>
  );
};

export default BtnMarkAsImportant;
