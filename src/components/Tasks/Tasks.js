import React, { useEffect, useState } from 'react';
import TaskItem from './TaskItem';
import axios from 'axios';
import { ALL_TASKS_FROM_PROJECT } from '../../endpoints';
import '../../styles/Tasks.css';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

function Tasks({ projectId, isTasksPage }) {
  const [tasks, setTasks] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const projectName = sessionStorage.getItem('name');
  const description = sessionStorage.getItem('description');
  const navigate = useNavigate();

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
      if (!isTasksPage) {
        const response = await axios.get(endpoint, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });
        setTasks(response.data);
      } else {
        const response = await axios.get(
          'http://localhost:3000/tasks/all_tasks',
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        );

        const userId = localStorage.getItem('userId');
        const res = await axios.get(
          `http://localhost:3000/auth/get_user_by_id/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        );
        const myTasks = [];
        for (const t of response.data) {
          if (t.assignedTo === res.data.username) {
            myTasks.push(t);
          }
        }
        setTasks(myTasks);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const createNewTask = () => {
    navigate('/tasks/createTask');
  };

  const handleDelete = async () => {
    const projectId = sessionStorage.getItem('_id');
    const jwt = localStorage.getItem('access_token');
    try {
      const response = await axios.delete(
        `http://localhost:3000/projects/delete_project/${projectId}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      navigate('/projects');
    } catch (error) {}
  };

  const handleEdit = () => {
    navigate(`/editProject/${projectId}`);
  };

  const isListInView1 = false;

  return (
    <div className='tasks'>
      {isTasksPage === false && (
        <div className='projectHeader'>
          <div className='navbar'>
            <button className='btn' onClick={handleEdit}>
              Edit Project
            </button>
            <div className='title'>{projectName}</div>
            <button className='btn' onClick={handleDelete}>
              Delete Project
            </button>
          </div>
          <div>{description}</div>
        </div>
      )}
      {isTasksPage && (
        <div className='projectHeader'>
          <div className='title'>These are your tasks</div>
        </div>
      )}
      <AnimatePresence>
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
              className={`border-2 border-black
             text-black-400 w-full rounded-lg
              border-dashed transition hover:bg-slate-100
                ${isListInView1 ? 'h-20 sm:h-32' : 'h-52 sm:h-64'}`}
            >
              Add new task
            </button>
          </li>
          {tasks.map((task) => {
            return (
              <motion.div
                key={task._id}
                style={{ overflow: 'hidden' }}
                layout
                initial={{ transform: 'scale(0)' }}
                animate={{ transform: 'scale(1)' }}
                exit={{ transform: 'scale(0)', duration: 0 }}
              >
                <TaskItem
                  key={task._id}
                  isListInView1={isListInView1}
                  task={task}
                  onRefresh={onRefresh}
                />
              </motion.div>
            );
          })}
        </ul>
      </AnimatePresence>
    </div>
  );
}

export default Tasks;
