import React, { useEffect, useState } from 'react';
import '../../styles/Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateNote({ id, noteId }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    content: '',
    taskName: '',
  });

  useEffect(() => {
    getTaskName();
    if (noteId) {
      getNote();
    }
  }, []);

  const getNote = async () => {
    const jwt = localStorage.getItem('access_token');
    try {
      const response = await axios.get(
        `http://localhost:3000/notes/${noteId}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      const note = response.data;
      setFormData((prevData) => ({
        ...prevData,
        name: note.name,
        content: note.content,
      }));
    } catch (error) {}
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const getTaskName = async () => {
    const jwt = localStorage.getItem('access_token');
    try {
      const response = await axios.get(`http://localhost:3000/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      const taskName = response.data.name;
      setFormData((prevData) => ({
        ...prevData,
        taskName: taskName,
      }));
    } catch (error) {}
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const jwt = localStorage.getItem('access_token');
    try {
      if (noteId) {
        await axios.put(
          `http://localhost:3000/notes/update_note/${noteId}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        );

        navigate(`/tasks/${id}`);
      } else {
        await axios.put(
          `http://localhost:3000/tasks/add_note/${id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        );

        navigate(`/tasks/${id}`);
      }
    } catch (error) {}
  };

  return (
    <div className='loginContainer'>
      {noteId ? (
        <h2 className='pageTitle'>Edit Note</h2>
      ) : (
        <h2 className='pageTitle'>Create Note</h2>
      )}
      <form className='login' onSubmit={handleSubmit}>
        <label>
          <div>Name:</div>
          <input
            required
            type='text'
            name='name'
            value={formData.name}
            onChange={handleInputChange}
          />
        </label>
        <label className='selectMargin'>
          <div className='divMargin'>Content:</div>
          <textarea
            className='textarea'
            required
            name='content'
            value={formData.content}
            onChange={handleInputChange}
          ></textarea>
        </label>
        {noteId ? (
          <button className='btn'>Edit Note</button>
        ) : (
          <button className='btn'>Add Note</button>
        )}
      </form>
    </div>
  );
}

export default CreateNote;
