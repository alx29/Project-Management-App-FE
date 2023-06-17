import React, { useState } from 'react';
import { ReactComponent as Trash } from '../../assets/trash.svg';
import ModalConfirm from './Modal/ModalConfirm';
import { DELETE_TASK } from '../../endpoints';
import axios from 'axios';

const BtnDeleteTask = ({ taskId, onRefresh }) => {
  const [showModal, setShowModal] = useState(false);

  const getEndpoint = () => {
    const index = DELETE_TASK.indexOf('{');
    return DELETE_TASK.slice(0, index) + taskId;
  };

  const deleteTask = async () => {
    setShowModal(false);

    const jwt = localStorage.getItem('access_token');
    const endpoint = getEndpoint();
    try {
      const response = await axios.put(
        endpoint,
        {},
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      onRefresh();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {showModal && (
        <ModalConfirm
          onClose={() => setShowModal(false)}
          text='This task will be deleted permanently.'
          onConfirm={deleteTask}
        />
      )}
      <button
        onClick={() => setShowModal(true)}
        title='delete task'
        className='ml-2 transition hover:text-slate-700 dark:hover:text-slate-200'
      >
        <Trash className='w-5 h-5 sm:w-6 sm:h-6' />
      </button>
    </>
  );
};

export default BtnDeleteTask;
