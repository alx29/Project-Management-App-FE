import { NavLink } from 'react-router-dom';
import '../styles/Sidebar.css';
import TaskIcon from '@mui/icons-material/Task';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddBoxIcon from '@mui/icons-material/AddBox';
import LogoutIcon from '@mui/icons-material/Logout';
import Logo from './Logo';

export default function Sidebar() {
  return (
    <div className='sidebar'>
      <div className='user'>
        <Logo className='logo' />
        <p>Hi, Alex Paraschiv</p>
      </div>
      <div className='item'>
        <NavLink exact to='/'>
          <DashboardIcon className='icon' />
          <span>Dashboard</span>
        </NavLink>
      </div>
      <div className='item'>
        <NavLink to='/create'>
          <AddBoxIcon className='icon' />
          <span>New Project</span>
        </NavLink>
      </div>
      <div className='item'>
        <NavLink to='/'>
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
