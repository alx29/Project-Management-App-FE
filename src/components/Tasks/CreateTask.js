import React from 'react';
import '../../styles/Create.css';
import Sidebar from '../Sidebar';
import CreateTaskForm from './CreateTaskForm';

function CreateTask() {
  return (
    <div className='createContainer'>
      <Sidebar />
      <CreateTaskForm />
    </div>
  );
}

export default CreateTask;
