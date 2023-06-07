import React from 'react';
import '../../styles/Create.scss';
import Sidebar from '../Sidebar';
import CreateProject from './CreateProject';

function Create() {
  return (
    <div className='createContainer'>
      <Sidebar />
      <CreateProject />
    </div>
  );
}

export default Create;
