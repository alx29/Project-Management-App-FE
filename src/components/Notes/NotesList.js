import React, { useEffect, useState } from 'react';
import '../../styles/NotesList.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Note from './Note';

function NotesList({ task }) {
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchNotes();
  }, [task]);

  const fetchNotes = async () => {
    const jwt = localStorage.getItem('access_token');
    try {
      const response = await axios.get(
        `http://localhost:3000/notes/all_notes`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      const aux = [];
      for (const n of response.data) {
        if (task.notesID.includes(n._id)) {
          aux.push(n);
        }
      }
      setNotes(aux);
    } catch (error) {}
  };

  const addNote = () => {
    navigate(`/tasks/${task._id}/createNote`);
  };

  return (
    <div className='notesList'>
      <ul
        className='mt-4 grid gap-2 sm:gap-4 xl:gap-6 2xl:grid-cols-4 xl:grid-cols-3 
      lg:grid-cols-4 md:grid-cols-3 grid-cols-2 items-end'
      >
        <li>
          <button
            className='border-2 border-black
             text-black-400 w-full rounded-lg
              border-dashed transition hover:bg-slate-100 h-52 sm:h-64'
            onClick={addNote}
          >
            Add new note
          </button>
        </li>
        {notes.map((n) => {
          return <Note key={n._id} id={task._id} note={n} />;
        })}
      </ul>
    </div>
  );
}

export default NotesList;
