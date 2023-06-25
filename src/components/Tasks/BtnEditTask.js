import React, { useState } from 'react';
import ModalCreateTask from './Modal/ModalTask';
import { ReactComponent as OptionsSvg } from '../../assets/options.svg';
import { UPDATE_TASK } from '../../endpoints';
import axios from 'axios';

const BtnEditTask = ({ task, onRefresh, nameForm }) => {
  const { _id } = task;
  const [modalEditTaskOpen, setModalEditTaskOpen] = useState(false);

  const closeModalEditTask = () => {
    setModalEditTaskOpen(false);
  };

  const openModalEditTask = () => {
    setModalEditTaskOpen(true);
  };

  const editTaskHandler = async (task) => {
    const jwt = localStorage.getItem('access_token');
    const index = UPDATE_TASK.indexOf('{');
    const endpoint =
      UPDATE_TASK.slice(0, index) + _id;

    try {
      await axios.put(
        endpoint,
        {
          name: task.name,
          status: task.status,
          description: task.description,
          important: task.important,
          completed: task.completed,
          endDate: task.endDate,
          assignedTo: task.assignedTo,
        },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      setModalEditTaskOpen(false);
      onRefresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <button
        title='edit task'
        className='transition w-7 sm:w-8 h-6 sm:h-8 grid place-items-center dark:hover:text-slate-200 hover:text-slate-700'
        onClick={openModalEditTask}
      >
        <OptionsSvg className='w-4 sm:w-5 h-4 sm:h-5' />
      </button>
      {modalEditTaskOpen && (
        <ModalCreateTask
          onClose={closeModalEditTask}
          task={task}
          nameForm={nameForm}
          onConfirm={editTaskHandler}
        />
      )}
    </>
  );
};

export default BtnEditTask;
