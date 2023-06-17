import React, { useEffect, useState } from 'react';
import { ReactComponent as SvgX } from '../../assets/x.svg';
import { ReactComponent as Check } from '../../assets/check.svg';
import axios from 'axios';
import { UPDATE_TASK } from '../../endpoints.js';

const BtnToggleCompleted = ({
  taskCompleted,
  taskId,
  isListInView1,
  onRefresh,
}) => {
  const [completed, setCompleted] = useState(taskCompleted);

  const toggleTaskCompleted = async () => {
    const aux = !completed;
    setCompleted(aux);

    const jwt = localStorage.getItem('access_token');
    const index = UPDATE_TASK.indexOf('{');
    const endpoint = UPDATE_TASK.slice(0, index) + taskId;

    try {
      await axios.put(
        endpoint,
        {
          completed: aux,
          status: aux ? 'done' : 'to do',
        },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      onRefresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button
      title={completed ? 'mark as uncompleted' : 'mark as completed'}
      className={`${
        completed
          ? 'bg-emerald-200 text-emerald-800 '
          : 'bg-amber-200 text-amber-800 '
      } ${isListInView1 ? 'mr-4' : 'mr-4 order-0'} rounded-full font-medium`}
      onClick={() => toggleTaskCompleted(taskId)}
    >
      <span className='block py-1 px-3 absolute invisible sm:static sm:visible'>
        {completed ? 'completed' : 'uncompleted'}
      </span>
      <span className=' sm:hidden w-6 h-6 grid place-items-center'>
        {completed ? (
          <Check className='w-3 h-3' />
        ) : (
          <SvgX className='w-3 h-3' />
        )}
      </span>
    </button>
  );
};

export default BtnToggleCompleted;
