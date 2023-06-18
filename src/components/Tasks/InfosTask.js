import React, { useEffect, useState } from 'react';
import { ReactComponent as Calendar } from '../../assets/date.svg';

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const InfosTask = ({ task, isListInView1 }) => {
  const { endDate, name, description, status, assignedTo } = task;
  const [deadline, setDeadline] = useState('');
  const [newStatus, setNewStatus] = useState('');

  useEffect(() => {
    setDeadline(getDeadline());
    setNewStatus(status);
  }, [task]);

  const getDeadline = () => {
    const date = new Date(endDate);

    const day = date.getDate();
    const month = date.getMonth();
    const spelledDate = day + ' ' + monthNames[month];

    return spelledDate;
  };

  return (
    <div className={`flex flex-col flex-1 ${isListInView1 ? 'mr-6' : ''}`}>
      <div
        className={`flex items-center justify-between ${
          isListInView1 ? 'mb-1' : 'mb-2'
        }`}
      >
        <span className='block font-medium dark:text-slate-200'>{name}</span>
      </div>
      <div className='text-base'>Assigned to: {assignedTo}</div>
      <p
        title={description}
        className={`description mb-2 text-slate-500 dark:text-slate-500 mt-1 ${
          isListInView1 ? 'line-clamp-2 sm:line-clamp-1' : 'line-clamp-2'
        }`}
      >
        {description}
      </p>
      <div className='flex flex-row justify-between mt-auto flex w-full'>
        <time className='flex w-full'>
          <Calendar className='mr-2 w-4 sm:w-5' /> {deadline}
        </time>
        <div className='flex flex-row-reverse w-full text-sm'>{newStatus}</div>
      </div>
    </div>
  );
};

export default InfosTask;
