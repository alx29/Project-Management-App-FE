import React, { useEffect, useState } from 'react';
import TaskItem from './TaskItem';
import axios from 'axios';
import { ALL_TASKS_FROM_PROJECT } from '../../endpoints';

function Tasks({ projectId }) {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    fetchTasks();
  }, []);

  const getEndpoint = () => {
    const index = ALL_TASKS_FROM_PROJECT.indexOf('{');
    return (
      ALL_TASKS_FROM_PROJECT.slice(0, index) + sessionStorage.getItem('_id')
    );
  };

  const fetchTasks = async () => {
    const jwt = localStorage.getItem('access_token');
    const endpoint = getEndpoint();
    try {
      const response = await axios.get(endpoint, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      setTasks(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const isListInView1 = false;

  return (
    <div className='tasks'>
      <ul
        className={`tasksList mt-4 grid gap-2 sm:gap-4 xl:gap-6 ${
          isListInView1
            ? 'grid-cols-1'
            : '2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 items-end'
        }`}
      >
        {tasks.map((task) => {
          return (
            <TaskItem
              key={task._id}
              isListInView1={isListInView1}
              task={task}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default Tasks;
