import React, { useState } from 'react';
import { ReactComponent as Trash } from '../../assets/trash.svg';
import ConfirmationModal from './ConfirmationModal';

const BtnDeleteTask = ({ taskId }) => {
  const [showModal, setShowModal] = useState(false);
  // const dispatch = useAppDispatch();

  const deleteTask = () => {
    setShowModal(false);
  };
  return (
    <>
      {showModal && (
        <ConfirmationModal
          onCancel={() => setShowModal(false)}
          message='This task will be deleted permanently.'
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
