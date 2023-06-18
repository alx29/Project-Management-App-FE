import React from 'react';
import '../../styles/ProjectPage.css';
import Sidebar from '../Sidebar';
import Tasks from './Tasks';
import { useParams } from 'react-router-dom';

function MyTasks() {
  const { id } = useParams();

  return (
    <div className='projectPageContainer'>
      <Sidebar />
      <div className='projectPage'>
        <Tasks projectId={id} isTasksPage={true} />
      </div>
    </div>
  );
}

export default MyTasks;
