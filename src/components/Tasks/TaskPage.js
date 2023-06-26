import React, { useEffect, useState } from 'react';
import '../../styles/ProjectPage.css';
import Sidebar from '../Sidebar';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Notes from '../Notes/Notes';

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

const getDeadline = (endDate) => {
  const date = new Date(endDate);

  const day = date.getDate();
  const month = date.getMonth();
  const spelledDate = day + ' ' + monthNames[month];

  return spelledDate;
};

function TaskPage() {
  const { id } = useParams();
  const [task, setTask] = useState({});

  useEffect(() => {
    fetchTaskData();
  }, [task]);

  const fetchTaskData = async () => {
    try {
      const jwt = localStorage.getItem('access_token');
      const response = await axios.get(`http://localhost:3000/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      const endDate = response.data.endDate;
      const deadline = getDeadline(endDate);
      setTask({ ...response.data, deadline: deadline });
    } catch (error) {}
  };

  return (
    <div className='projectPageContainer'>
      <Sidebar />
      <div className='projectPage'>
        <Notes task={task} />
      </div>
    </div>
  );
}

export default TaskPage;
