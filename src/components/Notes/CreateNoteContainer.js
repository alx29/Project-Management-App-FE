import React from 'react';
import Sidebar from '../Sidebar';
import CreateNote from './CreateNote';
import '../../styles/Create.css';
import { useParams } from 'react-router-dom';

function CreateNoteContainer() {
  const params = useParams();
  const { id } = params;

  return (
    <div className='createContainer'>
      <Sidebar />
      <CreateNote id={id} />
    </div>
  );
}

export default CreateNoteContainer;
