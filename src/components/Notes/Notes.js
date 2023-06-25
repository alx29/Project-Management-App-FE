import React, { useEffect, useState } from 'react';
import '../../styles/Notes.css';
import { ReactComponent as Calendar } from '../../assets/date.svg';
import axios from 'axios';

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

function Notes({ id }) {
  const [taskData, setTaskData] = useState({});
  const [deadline, setDeadline] = useState('');

  useEffect(() => {
    fetchTaskData();
    const aux = getDeadline();
    setDeadline(aux);
  }, [taskData]);

  const fetchTaskData = async () => {
    try {
      const jwt = localStorage.getItem('access_token');
      const response = await axios.get(`http://localhost:3000/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      setTaskData(response.data);
    } catch (error) {}
  };

  const getDeadline = () => {
    const date = new Date(taskData.endDate);

    const day = date.getDate();
    const month = date.getMonth();
    const spelledDate = day.toString() + ' ' + monthNames[month];

    return spelledDate;
  };

  const editTask = () => {};

  return (
    <div className='notes'>
      <div className='taskHeader'>
        <div className='title'> {taskData.name}</div>
      </div>
      <div className='taskContent'>
        <div className='text-lg'>Assigned to: {taskData.assignedTo}</div>
        <p
          title={taskData.description}
          className={`description mb-2 text-slate-500 dark:text-slate-500 mt-1
            }`}
        >
          {taskData.description}
        </p>
        <div className='flex flex-row justify-between mt-auto flex w-full'>
          <time className='flex w-full'>
            <Calendar className='mr-2 w-4 sm:w-5' /> {deadline}
          </time>
          <div className='flex flex-row-reverse w-full text-sm'>
            {taskData.status}
          </div>
        </div>
      </div>
      <div className='notesContent'>Aaaaaaaaaaaaaaaa</div>
    </div>
  );
}

export default Notes;
