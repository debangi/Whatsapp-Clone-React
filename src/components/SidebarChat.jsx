import { Avatar } from '@mui/material';
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../firebase-config';

import './SidebarChat.css';

const SidebarChat = ({ id, name, addNewChat }) => {
  const [messages, setMessages] = useState('');
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
  useEffect(() => {
    if (id) {
      const q = query(
        collection(db, 'rooms', id, 'messages'),
        orderBy('timestamp', 'desc')
      );
      onSnapshot(q, (snapshot) => {
        setMessages(snapshot.docs.map((doc) => doc.data()));
      });
    }
  }, [id]);

  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className='sidebarChat'>
        <Avatar src={`https://avatars.dicebear.com/api/human/${id}.svg`} />
        <div className='sidebarChat__info'>
          <h2>{name}</h2>
          <p>{messages[0]?.text || `No messages yet...`}</p>
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
