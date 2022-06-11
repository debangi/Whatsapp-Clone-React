import React, { Fragment, useContext, useEffect, useState } from 'react';

import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase-config';
import Avatar from '@mui/material/Avatar';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import SearchOutlined from '@mui/icons-material/SearchOutlined';

import './Sidebar.css';
import SidebarChat from './SidebarChat';
import { Outlet } from 'react-router';
import { StateContext } from '../StateProvider';

const Sidebar = () => {
  const { user } = useContext(StateContext);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'rooms'), (snapshot) => {
      setRooms(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
    return unsubscribe;
  }, []);
  // console.log(rooms);

  return (
    <Fragment>
      <div className='sidebar'>
        <div className='sidebar__header'>
          <Avatar src={user?.photoURL} alt='' />
          <div className='sidebar__headerRight'>
            <IconButton>
              <DonutLargeIcon />
            </IconButton>
            <IconButton>
              <ChatIcon />
            </IconButton>
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          </div>
        </div>
        <div className='sidebar__search'>
          <div className='sidebar__searchContainer'>
            <SearchOutlined />
            <input placeholder='Search or start a new chat' type='text' />
          </div>
        </div>
        <div className='sidebar__chats'>
          <SidebarChat addNewChat />
          {rooms.map((room) => (
            <SidebarChat key={room.id} id={room.id} name={room.data.name} />
          ))}
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Sidebar;
