import React, { useEffect, useState } from 'react'
import '../../styles/ProjectCategory.css';
import CodeIcon from '@mui/icons-material/Code';
import BrushIcon from '@mui/icons-material/Brush';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import SelectAllIcon from '@mui/icons-material/SelectAll';

function ProjectCategory(props) {
  const [color, setColor] = useState('#BFDFEB');
  const { category, filterByCategory } = props;
  const styleBackground = {
    backgroundColor: color,
  }

  useEffect(() => {
    if (category === 'Development') {
      setColor('#E76161');
    } else if (category === 'Design') {
      setColor('#BFDFEB')
    } else if (category === 'Sales') {
      setColor('#B04759');
    } else if (category === 'Marketing') {
      setColor('#8BACAA');
    } else if (category === 'All') {
      setColor('#95CB26');
    }
  }, []);

  const sendCategory = () => {
    filterByCategory(category);
  }

  return (
    <div className='container' onClick={sendCategory}>
      <div className='project' style={styleBackground}>
        {category === 'All' && <SelectAllIcon className='category' />}
        {category === 'Development' && <CodeIcon />}
        {category === 'Design' && <BrushIcon />}
        {category === 'Sales' && <MonetizationOnIcon />}
        {category === 'Marketing' && <AddBusinessIcon />}
      </div>
      <div>{category}</div>
    </div>
  )
}

export default ProjectCategory