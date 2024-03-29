import React, { useEffect, useState } from 'react';
import '../../styles/Project.css';
import CodeIcon from '@mui/icons-material/Code';
import BrushIcon from '@mui/icons-material/Brush';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import { useNavigate } from 'react-router-dom';

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

function Project({ project }) {
  const navigate = useNavigate();
  const [color, setColor] = useState('');
  const {
    name,
    description,
    startDate,
    endDate,
    budget,
    status,
    category,
    projectManager,
    _id,
  } = project;
  useEffect(() => {
    if (category === 'development') {
      setColor('#E76161');
    } else if (category === 'design') {
      setColor('#BFDFEB');
    } else if (category === 'sales') {
      setColor('#B04759');
    } else if (category === 'marketing') {
      setColor('#8BACAA');
    }
  }, []);
  const styleColor = {
    backgroundColor: color,
  };

  const customizeDate = () => {
    const date = new Date(endDate);

    const day = date.getDate();
    const month = date.getMonth();
    const spelledDate = day + ' ' + monthNames[month];

    return spelledDate;
  };

  const seeProject = () => {
    sessionStorage.setItem('name', name);
    sessionStorage.setItem('description', description);
    sessionStorage.setItem('startDate', startDate);
    sessionStorage.setItem('endDate', endDate);
    sessionStorage.setItem('budget', budget);
    sessionStorage.setItem('status', status);
    sessionStorage.setItem('category', category);
    sessionStorage.setItem('projectManager', projectManager);
    sessionStorage.setItem('_id', _id);
    navigate(`/projects/projectPage/${_id}`);
  };

  return (
    <div className='projectContainer' style={styleColor} onClick={seeProject}>
      <div className='project'>
        {category === 'development' && <CodeIcon />}
        {category === 'design' && <BrushIcon />}
        {category === 'sales' && <MonetizationOnIcon />}
        {category === 'marketing' && <AddBusinessIcon />}
        <div className='projectName'>{name}</div>
      </div>
      <div className='date'>{customizeDate()}</div>
    </div>
  );
}

export default Project;
