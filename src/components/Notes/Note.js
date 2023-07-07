import React from 'react';
import { ReactComponent as OptionsSvg } from '../../assets/options.svg';
import { ReactComponent as Trash } from '../../assets/trash.svg';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Note({ id, note }) {
  const navigate = useNavigate();

  const deleteNote = async () => {
    try {
      const jwt = localStorage.getItem('access_token');
      await axios.delete(
        `http://localhost:3000/tasks/delete_note/${id}/${note._id}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      navigate(`/tasks/${id}`);
    } catch (error) {}
  };

  const updateNote = () => {
    navigate(`/tasks/${id}/editNote/${note._id}`);
  };

  return (
    <li>
      <article
        className='bg-purple-200 rounded-lg p-3 sm:p-4 flex 
      text-left transition hover:shadow-lg hover:shadow-slate-300 
      dark:bg-slate-800 dark:hover:shadow-transparent flex-col h-52 sm:h-64'
      >
        <div className='text-lg'>{note.name}</div>
        <p
          title={note.content}
          className={`description mb-2 text-slate-500 dark:text-slate-500 mt-1
            }`}
        >
          {note.content}
        </p>
        <div className='flex flex-row-reverse mt-auto'>
          <Trash
            className='w-4 sm:w-5 h-4 sm:h-5 cursor-pointer'
            onClick={deleteNote}
          />
          <OptionsSvg
            className='w-4 sm:w-5 h-4 sm:h-5 pr-3 cursor-pointer'
            onClick={updateNote}
          />
        </div>
      </article>
    </li>
  );
}

export default Note;
