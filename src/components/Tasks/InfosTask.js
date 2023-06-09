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
  const { endDate, name, description } = task;
  const [deadline, setDeadline] = useState('');

  useEffect(() => {
    setDeadline(getDeadline);
  }, []);

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
      <p
        title={description}
        className={`description mb-2 text-slate-500 dark:text-slate-500 ${
          isListInView1 ? 'line-clamp-2 sm:line-clamp-1' : 'line-clamp-3'
        }`}
      >
        {description}
      </p>
      <time className='mt-auto flex w-full'>
        <Calendar className='mr-2 w-4 sm:w-5' /> {deadline}
      </time>
    </div>
  );
};

export default InfosTask;
