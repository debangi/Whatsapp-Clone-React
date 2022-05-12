import './App.css';
import Chat from './components/Chat';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import { Route, Routes } from 'react-router';
import { useContext, useEffect } from 'react';
import Login from './components/Login';
import { StateContext } from './StateProvider';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase-config';

function App() {
  const { user, addCurrentUser, removeCurrentUser } = useContext(StateContext);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        addCurrentUser(currentUser);
      } else {
        removeCurrentUser();
      }
    });
    return unsubscribe;
  }, []);
  console.log(user);
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
