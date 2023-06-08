import { useState, useEffect } from 'react';
import Select from 'react-select';
import '../../styles/Login.css';
import axios from 'axios';

const categories = [
  { value: 'development', label: 'Development' },
  { value: 'design', label: 'Design' },
  { value: 'sales', label: 'Sales' },
  { value: 'marketing', label: 'Marketing' },
];

const statuses = [
  {value: 'to do', label: 'to do'},
  {value: 'doing', label: 'doing'},
  {value: 'done', label: 'done'},
]

export default function CreateProject() {
  const [status, setStatus] = useState(null); 
  const [category, setCategory] = useState(null);
  const [projectManager, setProjectManager] = useState(null);
  const [options, setOptions] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    startDate: new Date(),
    endDate: new Date(),
    budget: 0,
    category: '',
    status: '',
    projectManager: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const handleStatusChnage = (newStatus) => {
    setStatus(newStatus);

    setFormData((prevData) => ({
      ...prevData,
      status: newStatus.value,
    }));
  };

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

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(formData);
  };

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setFormData((prevData) => ({
      ...prevData,
      category: newCategory.value,
    }));
  };

  const handleProjectManagerChange = (newProjectManager) => {
    setProjectManager(newProjectManager);

    setFormData((prevData) => ({
      ...prevData,
      projectManager: newProjectManager.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const jwt = localStorage.getItem('access_token');
      const response = await axios.post(
        'http://localhost:3000/projects/create_project',formData,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='loginContainer'>
      <div className='pageTitle'>Create a new Project</div>
      <form className='login' onSubmit={handleSubmit}>
        <label>
          <div>Project name:</div>
          <input
            required
            type='text'
            name='name'
            value={formData.name}
            onChange={handleInputChange}
          />
        </label>
        <label className='selectMargin'>
          <div className='divMargin'>Project Description:</div>
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
        <label>
          <div>Budget:</div>
          <input
            type='number'
            name='budget'
            value={formData.budget}
            onChange={handleInputChange}
          ></input>
        </label>
        <label className='selectMargin'>
          <div className='divMargin'>Project category:</div>
          <Select
            options={categories}
            value={category}
            onChange={handleCategoryChange}
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
          <div className='divMargin'>Project Manager:</div>
          <Select
            options={options}
            value={projectManager}
            onChange={handleProjectManagerChange}
          />
        </label>
        <button className='btn'>Add Project</button>
      </form>
    </div>
  );
}
