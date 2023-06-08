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
      const response = await axios.post(
        LOGIN,
        formData
      );
      console.log(response.data.access_token);
      localStorage.setItem('access_token', response.data.access_token);
      navigate('/projects');
    } catch (error) {
      console.log(error);
    }
    setFormData({
      username: '',
      password: '',
    });
  };

  return { formData, handleInputChange, handleSubmit };
}

export default useLoginForm;
