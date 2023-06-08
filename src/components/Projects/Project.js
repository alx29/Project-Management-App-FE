import React, { useEffect, useState } from 'react';
import '../../styles/Project.css';
import CodeIcon from '@mui/icons-material/Code';
import BrushIcon from '@mui/icons-material/Brush';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';

const monthNames = [
  "January", "February", "March", "April", "May", "June", 
  "July", "August", "September", "October", "November", "December"
];


function Project({project}) {
  const [color, setColor] = useState('');
  const {name, description, startDate, endDate, budget, status, category, projectManager} = project;
  useEffect(() => {
    if (category === 'development') {
      setColor('#b52b79');
    } else if (category === 'design') {
      setColor('#BFDFEB')
    } else if (category === 'sales') {
      setColor('#FF0000');
    } else if (category === 'marketing') {
      setColor('#FA8072');
    }
  }, []);
  const styleColor = {
    backgroundColor: color,
  }

  const customizeDate = () => {
    const date = new Date(endDate);

    const day = date.getDate();
    const month = date.getMonth();
    const spelledDate = day + " " + monthNames[month];

    return spelledDate;
  }

  return (
    <div className='projectContainer' style={styleColor}>
      <div className='project'>
        {category === 'development' && <CodeIcon />}
        {category === 'design' && <BrushIcon />}
        {category === 'sales' && <MonetizationOnIcon />}
        {category === 'marketing' && <AddBusinessIcon />}
        <div className='projectName'>{name}</div>
      </div>
      <div className='date'>{customizeDate()}</div>
    </div>
    
  )
}

export default Project