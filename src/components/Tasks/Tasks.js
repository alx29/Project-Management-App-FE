import React, { useEffect, useState } from 'react';
import TaskItem from './TaskItem';
import axios from 'axios';
import { ALL_TASKS_FROM_PROJECT } from '../../endpoints';
import '../../styles/Tasks.css';

function Tasks({ projectId }) {
  const [tasks, setTasks] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const projectName = sessionStorage.getItem('name');
  const description = sessionStorage.getItem('description');

  useEffect(() => {
    fetchTasks();
  }, [refresh]);

  const onRefresh = () => {
    setRefresh(refresh + 1);
  };

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

  const createNewTask = () => {};

  const isListInView1 = false;

  return (
    <div className='tasks'>
      <div className='projectHeader'>
        <div className='title'>{projectName}</div>
        <div>{description}</div>
      </div>
      <ul
        className={`tasksList mt-4 grid gap-2 sm:gap-4 xl:gap-6 ${
          isListInView1
            ? 'grid-cols-1'
            : '2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 items-end'
        }`}
      >
        <li>
          <button
            onClick={createNewTask}
            className={`border-2 border-slate-300
             text-slate-400 w-full rounded-lg
              border-dashed transition hover:bg-slate-300
               hover:text-slate-500
               dark:border-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-300 ${
                 isListInView1 ? 'h-20 sm:h-32' : 'h-52 sm:h-64'
               }`}
          >
            Add new task
          </button>
        </li>
        {tasks.map((task) => {
          return (
            <TaskItem
              key={task._id}
              isListInView1={isListInView1}
              task={task}
              onRefresh={onRefresh}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default Tasks;
