import './App.css';
import Chat from './components/Chat';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import { Route, Routes } from 'react-router';
import { useState } from 'react';
import Login from './components/Login';

function App() {
  const [user, setUser] = useState(null);
  return (
    <div className='app'>
      {!user ? (
        <Login />
      ) : (
        <div className='app__body'>
          <Routes>
            <Route path='/' element={<Sidebar />}>
              <Route index element={<Home />} />
              <Route path='/rooms/:roomId' element={<Chat />} />
            </Route>
          </Routes>
        </div>
      )}
    </div>
  );
}

export default App;
