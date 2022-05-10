import { Avatar } from '@mui/material';
import { doc, setDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../firebase-config';

import './SidebarChat.css';

const SidebarChat = ({ id, name, addNewChat }) => {
  const [seed, setSeed] = useState('');

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  const createChat = async () => {
    const roomName = prompt('Please enter name for chat');
    if (roomName) {
      const roomDocRef = doc(db, 'rooms', `room${Date.now()}`);
      const payload = {
        name: roomName,
      };
      await setDoc(roomDocRef, payload);
    }
  };

  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className='sidebarChat'>
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className='sidebarChat__info'>
          <h2>{name}</h2>
          <p>Last message...</p>
        </div>
      </div>
    </Link>
  ) : (
    <div className='sidebarChat' onClick={createChat}>
      <h2>Add new chat</h2>
    </div>
  );
};

export default SidebarChat;
