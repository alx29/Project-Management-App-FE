import React, { useEffect, useState } from 'react';
import '../../styles/Login.css';
import Select from 'react-select';
import { InputCheckbox } from './Modal/ModalTask';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const statuses = [
  { value: 'to do', label: 'to do' },
  { value: 'doing', label: 'doing' },
  { value: 'done', label: 'done' },
];

function CreateTaskForm() {
  const [status, setStatus] = useState(null);
  const [assignedTo, setAssignedTo] = useState(null);
  const [options, setOptions] = useState([]);
  const [isImportant, setIsImportant] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    projectName: '',
    description: '',
    startDate: new Date(),
    endDate: new Date(),
    completed: false,
    status: '',
    important: false,
    projectManager: '',
    assignedTo: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
    const projectName = sessionStorage.getItem('name');
    const projectManager = sessionStorage.getItem('projectManager');
    setFormData((prevData) => ({
      ...prevData,
      projectName: projectName,
      projectManager: projectManager,
    }));
  }, []);

  const fetchData = async () => {
    try {
      const jwt = localStorage.getItem('access_token');
      const response = await axios.get('http://localhost:3000/all_users', {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      const formatedData = response.data.map((pm) => {
        return {
          value: pm.username,
          label: pm.username,
        };
      });
      setOptions(formatedData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleStatusChnage = (newStatus) => {
    setStatus(newStatus);

    setFormData((prevData) => ({
      ...prevData,
      status: newStatus.value,
    }));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAssignedToChange = (newAssignedTo) => {
    setAssignedTo(newAssignedTo);

    setFormData((prevData) => ({
      ...prevData,
      assignedTo: newAssignedTo.value,
    }));
  };

  const handleImportantCompleted = () => {
    setFormData((prevData) => ({
      ...prevData,
      important: isImportant,
      completed: isCompleted,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      handleImportantCompleted();
      const jwt = localStorage.getItem('access_token');
      const projectId = sessionStorage.getItem('_id');

      await axios.put(
        `http://localhost:3000/projects/add_task/${projectId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      navigate(`/projects/projectPage/${projectId}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='loginContainer'>
      <div className='pageTitle'>Create a new Task</div>
      <form className='login' onSubmit={handleSubmit}>
        <label>
          <div>Task name:</div>
          <input
            required
            type='text'
            name='name'
            value={formData.name}
            onChange={handleInputChange}
          />
        </label>
        <label className='selectMargin'>
          <div className='divMargin'>Task Description:</div>
          <textarea
            className='textarea'
            required
            name='description'
            value={formData.description}
            onChange={handleInputChange}
          ></textarea>
        </label>
        <label>
          <div>Set due date:</div>
          <input
            required
            type='date'
            name='endDate'
            value={formData.endDate}
            onChange={handleInputChange}
          />
        </label>
        <label className='selectMargin'>
          <div className='divMargin'>Status</div>
          <Select
            options={statuses}
            value={status}
            onChange={handleStatusChnage}
          />
        </label>
        <label className='selectMargin'>
          <div className='divMargin'>Assigned to:</div>
          <Select
            options={options}
            value={assignedTo}
            onChange={handleAssignedToChange}
          />
        </label>
        {/* <label className='mt-2'>
          <InputCheckbox
            isChecked={isImportant}
            setChecked={setIsImportant}
            label='Mark as important'
          />
        </label>
        <label className='mt-2'>
          <InputCheckbox
            isChecked={isCompleted}
            setChecked={setIsCompleted}
            label='Mark as completed'
          />
        </label> */}
        <button className='btn'>Add Task</button>
      </form>
    </div>
  );
}

export default CreateTaskForm;
