import React, { useState } from 'react';
import BtnEditTask from './BtnEditTask';
import BtnMarkAsImportant from './BtnMarkAsImportant';
import BtnDeleteTask from './BtnDeleteTask';
import BtnToggleCompleted from './BtnToggleCompleted';

const ActionsTaskItem = ({ task, isListInView1, onRefresh }) => {
  const { _id, completed, important } = task;

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
        <BtnMarkAsImportant taskId={_id} taskImportant={important} />
        <BtnDeleteTask taskId={_id} onRefresh={onRefresh} />
        <BtnEditTask task={task} onRefresh={onRefresh} nameForm={'Edit task'} />
      </div>
    </>
  );
};

export default ActionsTaskItem;
