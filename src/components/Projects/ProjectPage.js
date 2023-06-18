import React from 'react';
import '../../styles/ProjectPage.css';
import Sidebar from '../Sidebar';
import Tasks from '../Tasks/Tasks';
import { useParams } from 'react-router-dom';

function ProjectPage() {
  const { id } = useParams();

  return (
    <div className='projectPageContainer'>
      <Sidebar />
      <div className='projectPage'>
        <Tasks projectId={id} />
      </div>
    </div>
  );
}

export default ProjectPage;
