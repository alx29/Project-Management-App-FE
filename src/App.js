import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Authentication/Login';
import Signup from './components/Authentication/Signup';
import Create from './components/Projects/Create';
import Projects from './components/Projects/Projects';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/create' element={<Create />} />
          <Route path='/projects' element={<Projects />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
