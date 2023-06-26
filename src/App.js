import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Authentication/Login';
import Signup from './components/Authentication/Signup';
import Create from './components/Projects/Create';
import Projects from './components/Projects/Projects';
import ProjectPage from './components/Projects/ProjectPage';
import CreateTask from './components/Tasks/CreateTask';
import MyTasks from './components/Tasks/MyTasks';
import TaskPage from './components/Tasks/TaskPage';
import CreateNoteContainer from './components/Notes/CreateNoteContainer';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/create' element={<Create />} />
          <Route path='/editProject/:id' element={<Create />} />
          <Route path='/projects' element={<Projects />} />
          <Route path='/myProjects' element={<Projects />} />
          <Route path='/projects/projectPage/:id' element={<ProjectPage />} />
          <Route path='/tasks' element={<MyTasks />} />
          <Route path='/tasks/createTask' element={<CreateTask />} />
          <Route path='/tasks/:id' element={<TaskPage />} />
          <Route
            path='/tasks/:id/createNote'
            element={<CreateNoteContainer />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
