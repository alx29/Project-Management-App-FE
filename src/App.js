import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Authentication/Login';
import Signup from './components/Authentication/Signup';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/sidebar' element={<Sidebar />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
