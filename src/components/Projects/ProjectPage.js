import React, { useEffect, useState } from 'react';
import '../../styles/ProjectPage.css';
import Sidebar from '../Sidebar';

function ProjectPage() {
  const [description, setDescription] = useState('');
  useEffect(() => {
    setDescription(sessionStorage.getItem('description'));
  }, []);

  return (
    <div className='projectPageContainer'>
      <Sidebar />
      <div className='projectPage'>{description}</div>
    </div>
  )
}

export default ProjectPage