import { NavLink, useNavigate } from 'react-router-dom';
import '../styles/Sidebar.css';
import TaskIcon from '@mui/icons-material/Task';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddBoxIcon from '@mui/icons-material/AddBox';
import LogoutIcon from '@mui/icons-material/Logout';
import FeedIcon from '@mui/icons-material/Feed';
import Logo from './Logo';
import { useEffect, useState } from 'react';

export default function Sidebar() {
  const role = localStorage.getItem('role');
  const [access, setAccess] = useState(true);

  useEffect(() => {
    if (role === 'project_manager') {
      setAccess(true);
    } else {
      setAccess(false);
    }
  }, []);

  return (
    <div className='sidebar'>
      <div className='user'>
        <Logo className='logo' />
        <p>Hi, Alex Paraschiv</p>
      </div>
      <div className='item'>
        <NavLink exact to='/projects'>
          <DashboardIcon className='icon' />
          <span>Dashboard</span>
        </NavLink>
      </div>
      {access && (
        <div className='item'>
          <NavLink to='/create'>
            <AddBoxIcon className='icon' />
            <span>New Project</span>
          </NavLink>
        </div>
      )}
      <div className='item'>
        <NavLink to='/myProjects'>
          <FeedIcon className='icon' />
          <span>My Projects</span>
        </NavLink>
      </div>
      <div className='item'>
        <NavLink to='/tasks'>
          <TaskIcon className='icon' />
          <span>My Tasks</span>
        </NavLink>
      </div>
      <div className='item'>
        <NavLink to='/'>
          <LogoutIcon className='icon' />
          <span>Log Out</span>
        </NavLink>
      </div>
    </div>
  );
}
