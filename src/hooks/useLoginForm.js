import { useState } from 'react';
import axios from 'axios';
import { LOGIN } from '../endpoints.js';
import { useNavigate } from 'react-router-dom';

function useLoginForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(LOGIN, formData);
      localStorage.setItem('access_token', response.data.access_token);
      localStorage.setItem('role', response.data.role);
      localStorage.setItem('userId', response.data.id);
      navigate('/projects');
    } catch (error) {
      setError(true);
      console.log(error);
    }
    setFormData({
      username: '',
      password: '',
    });
  };

  return { formData, handleInputChange, handleSubmit, error };
}

export default useLoginForm;
