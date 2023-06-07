import { useState, useEffect } from 'react';
import Select from 'react-select';
import Sidebar from '../Sidebar';
import '../../styles/Login.scss';
import axios from 'axios';

const categories = [
  { value: 'development', label: 'Development' },
  { value: 'design', label: 'Design' },
  { value: 'sales', label: 'Sales' },
  { value: 'marketing', label: 'Marketing' },
];

export default function CreateProject() {
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
    projectManager: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const jwt =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFsZXgiLCJzdWIiOiI2NDU2MjllMjliMzBlZTdhYzJiM2UxNzEiLCJyb2xlIjoicHJvamVjdF9tYW5hZ2VyIiwiaWF0IjoxNjg2MDg1NjExLCJleHAiOjE2ODYxNzIwMTF9.8hOU0KDEFxh0PIJOZVikksKH_ySIDtj_fYe0rl2TR9A';
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

  const handleCategoryChange = (category) => {
    setCategory(category);
    console.log(category.value);
    setFormData((prevData) => ({
      ...prevData,
      category: category.value,
    }));
  };

  const handleProjectManagerChange = (projectManager) => {
    setProjectManager(projectManager);

    console.log(projectManager.value);
    setFormData((prevData) => ({
      ...prevData,
      projectManager: projectManager.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const jwt =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFsZXgyOWFuZHJlaSIsInN1YiI6IjY0N2FmMTZjODA4YjAyMDMzZGY1ZjNjYiIsInJvbGUiOiJwcm9qZWN0X21hbmFnZXIiLCJpYXQiOjE2ODYxMjU5MjksImV4cCI6MTY4NjIxMjMyOX0.ilUklprOnDPGJfkrrl-X-_5ACY_TKpOi0Jl7BAIJH_g';
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
      <h2 className='page-title'>Create a new Project</h2>
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
