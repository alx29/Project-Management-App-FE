import React from 'react';
import '../../styles/Notes.css';
import { ReactComponent as Calendar } from '../../assets/date.svg';
import NotesList from './NotesList';

function Notes({ task }) {
  const { name, assignedTo, description, deadline, status } = task;

  return (
    <div className='notes'>
      <div className='taskHeader'>
        <div className='title'> {name}</div>
      </div>
      <div className='taskContent'>
        <div className='text-lg'>Assigned to: {assignedTo}</div>
        <p
          title={description}
          className={`description mb-2 text-slate-500 dark:text-slate-500 mt-1
            }`}
        >
          {description}
        </p>
        <div className='flex flex-row justify-between mt-auto flex w-full'>
          <time className='flex w-full'>
            <Calendar className='mr-2 w-4 sm:w-5' /> {deadline}
          </time>
          <div className='flex flex-row-reverse w-full text-sm'>{status}</div>
        </div>
      </div>
      <NotesList task={task} />
    </div>
  );
}

export default Notes;
