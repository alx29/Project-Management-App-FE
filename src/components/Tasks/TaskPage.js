import React, { useEffect, useState } from 'react';
import '../../styles/ProjectPage.css';
import Sidebar from '../Sidebar';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Notes from '../Notes/Notes';

function TaskPage() {
  const { id } = useParams();
  const [task, setTask] = useState({});

  return (
    <div className='projectPageContainer'>
      <Sidebar />
      <div className='projectPage'>
        <Notes id={id} />
      </div>
    </div>
  );
}

export default TaskPage;
