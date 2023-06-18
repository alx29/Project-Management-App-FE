import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import InfosTask from './InfosTask';
import ActionsTaskItem from './ActionsTaskItem';

const TaskItem = ({ isListInView1, task, onRefresh }) => {
  const { projectName, _id } = task;
  const projectId = sessionStorage.getItem('_id');

  return (
    <>
      <li>
        <Link
          to={`/projects/projectPage/${_id}`}
          title={projectName}
          className='ml-auto mr-4 w-min whitespace-nowrap overflow-hidden max-w-[10rem] text-center text-ellipsis bg-rose-200 text-rose-600 px-4 py-1 rounded-t-md transition dark:bg-slate-700 dark:text-slate-200 block hover:bg-rose-300 dark:hover:bg-rose-500'
        >
          {task.projectName}
        </Link>
        <article
          className={`bg-slate-100 rounded-lg p-3 sm:p-4 flex text-left transition hover:shadow-lg hover:shadow-slate-300 dark:bg-slate-800 dark:hover:shadow-transparent ${
            isListInView1 ? 'flex-row sm:h-32' : 'flex-col h-52 sm:h-64 '
          }`}
        >
          <InfosTask task={task} isListInView1={isListInView1} />
          <ActionsTaskItem
            task={task}
            isListInView1={isListInView1}
            onRefresh={onRefresh}
          />
        </article>
      </li>
    </>
  );
};

export default TaskItem;
