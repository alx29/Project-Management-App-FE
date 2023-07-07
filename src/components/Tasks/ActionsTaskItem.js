import React, { useState } from 'react';
import BtnEditTask from './BtnEditTask';
import BtnMarkAsImportant from './BtnMarkAsImportant';
import BtnDeleteTask from './BtnDeleteTask';
import BtnToggleCompleted from './BtnToggleCompleted';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { useNavigate } from 'react-router-dom';

const ActionsTaskItem = ({ task, isListInView1, onRefresh }) => {
  const { _id, completed, important } = task;
  const navigate = useNavigate();

  const seeTask = () => {
    navigate(`/tasks/${_id}`);
  };

  return (
    <>
      <div
        className={`flex border-dashed border-slate-200 dark:border-slate-700/[.3] ${
          isListInView1 ? 'items-center' : 'border-t-2 w-full pt-4 mt-4'
        }`}
      >
        <BtnToggleCompleted
          taskCompleted={completed}
          taskId={_id}
          isListInView1={isListInView1}
          onRefresh={onRefresh}
        />
        <BtnMarkAsImportant taskId={_id} taskImportant={important} onRefresh={onRefresh}/>
        <BtnDeleteTask taskId={_id} onRefresh={onRefresh} />
        <BtnEditTask task={task} onRefresh={onRefresh} nameForm={'Edit task'} />
        <div className='cursor-pointer transition w-7 sm:w-8 h-6 sm:h-8 grid place-items-center dark:hover:text-slate-200 hover:text-slate-700'>
          <RemoveRedEyeIcon
            className='w-4 sm:w-5 h-4 sm:h-5'
            onClick={seeTask}
          ></RemoveRedEyeIcon>
        </div>
      </div>
    </>
  );
};

export default ActionsTaskItem;
