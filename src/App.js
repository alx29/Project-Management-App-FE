import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Authentication/Login';
import Signup from './components/Authentication/Signup';
import Create from './components/Projects/Create';
import Projects from './components/Projects/Projects';
import ProjectPage from './components/Projects/ProjectPage';
import Tasks from './components/Tasks/Tasks';
import CreateTask from './components/Tasks/CreateTask';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/create' element={<Create />} />
          <Route path='/projects' element={<Projects />} />
          <Route path='/projects/projectPage/:id' element={<ProjectPage />} />
          <Route path='/tasks' element={<Tasks />} />
          <Route path='/tasks/createTask' element={<CreateTask />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
