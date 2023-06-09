import React, { useEffect, useState } from 'react';
import '../../styles/ProjectPage.css';
import Sidebar from '../Sidebar';
import Tasks from '../Tasks/Tasks';

function ProjectPage() {
  const [description, setDescription] = useState('');
  const [_id, set_id] = useState('');
  useEffect(() => {
    setDescription(sessionStorage.getItem('description'));
    set_id(sessionStorage.getItem('_id'));
  }, []);

  return (
    <div className='projectPageContainer'>
      <Sidebar />
      <div className='projectPage'>
        <Tasks projectId={_id}/>
      </div>
    </div>
  )
}

export default ProjectPage