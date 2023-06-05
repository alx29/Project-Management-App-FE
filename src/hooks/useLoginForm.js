import { useState } from 'react';
import axios from 'axios';

function useLoginForm() {
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
        'http://localhost:3000/auth/login',
        formData
      );
      console.log(response.data);
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
