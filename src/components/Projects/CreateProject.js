import { useState, useEffect } from 'react';
import Select from 'react-select';
import '../../styles/Login.css';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const categories = [
  { value: 'development', label: 'Development' },
  { value: 'design', label: 'Design' },
  { value: 'sales', label: 'Sales' },
  { value: 'marketing', label: 'Marketing' },
];

const statuses = [
  { value: 'to do', label: 'to do' },
  { value: 'doing', label: 'doing' },
  { value: 'done', label: 'done' },
];

export default function CreateProject() {
  const [status, setStatus] = useState(null);
  const [category, setCategory] = useState(null);
  const [projectManager, setProjectManager] = useState(null);
  const [options, setOptions] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
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
    if (id) {
      const auxDate = sessionStorage.getItem('endDate');
      const index = auxDate.indexOf('T');
      const deadline = auxDate.slice(0, index);
      setFormData({
        name: sessionStorage.getItem('name'),
        description: sessionStorage.getItem('description'),
        endDate: deadline,
        budget: parseFloat(sessionStorage.getItem('budget')),
        category: sessionStorage.getItem('category'),
        status: sessionStorage.getItem('status'),
        projectManager: sessionStorage.getItem('projectManager'),
      });

      setCategory({
        value: sessionStorage.getItem('category'),
        label:
          sessionStorage.getItem('category').charAt(0).toUpperCase() +
          sessionStorage.getItem('category').slice(1),
      });
      setStatus({
        value: sessionStorage.getItem('status'),
        label: sessionStorage.getItem('status'),
      });
      setProjectManager({
        value: sessionStorage.getItem('projectManager'),
        label: sessionStorage.getItem('projectManager'),
      });
    }
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
      if (id) {
        sessionStorage.setItem('name', formData.name);
        sessionStorage.setItem('description', formData.description);
        sessionStorage.setItem('startDate', formData.startDate);
        sessionStorage.setItem('endDate', formData.endDate);
        sessionStorage.setItem('budget', formData.budget);
        sessionStorage.setItem('status', formData.status);
        sessionStorage.setItem('category', formData.category);
        sessionStorage.setItem('projectManager', formData.projectManager);
        sessionStorage.setItem('_id', id);
        const response = await axios.put(
          `http://localhost:3000/projects/${id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        );
        navigate('/projects');
      } else {
        const response = await axios.post(
          'http://localhost:3000/projects/create_project',
          formData,
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        );
        navigate('/projects');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='loginContainer'>
      {id === undefined ? (
        <div className='pageTitle'>Create a new Project</div>
      ) : (
        <div className='pageTitle'>Edit Project</div>
      )}
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
        {id === undefined ? (
          <button className='btn'>Add Project</button>
        ) : (
          <button className='btn'>Edit Project</button>
        )}
      </form>
    </div>
  );
}
