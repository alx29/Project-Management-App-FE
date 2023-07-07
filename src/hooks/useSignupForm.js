import { useState } from 'react';
import axios from 'axios';
import { SIGNUP } from '../endpoints';
import { useNavigate } from 'react-router-dom';

function useSignupForm() {
  const options = [
    { value: 'Project Manager', label: 'Progect Manager' },
    { value: 'Developer', label: 'Developer' },
    { value: 'Tester', label: 'Tester' },
  ];
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    role: '',
    password: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRoleChange = (role) => {
    setRole(role);

    let roleForRequest = '';
    if (role.value === 'Project Manager') {
      roleForRequest = 'project_manager';
    } else if (role.value === 'Developer') {
      roleForRequest = 'developer';
    } else if (role.value === 'Tester') {
      roleForRequest = 'tester';
    }

    setFormData((prevData) => ({
      ...prevData,
      role: roleForRequest,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(SIGNUP, formData);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
    setFormData({
      username: '',
      firstName: '',
      lastName: '',
      email: '',
      role: '',
      password: '',
    });
    setRole(null);
  };

  return {
    role,
    options,
    formData,
    handleInputChange,
    handleRoleChange,
    handleSubmit,
  };
}

export default useSignupForm;
