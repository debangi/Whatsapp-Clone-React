import React, { useContext, useEffect, useState } from 'react';

import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  Timestamp,
} from 'firebase/firestore';
import { db } from '../firebase-config';

import { Avatar, IconButton } from '@mui/material';
import SearchOutlined from '@mui/icons-material/SearchOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import MicIcon from '@mui/icons-material/Mic';
import { useParams } from 'react-router';
import { StateContext } from '../StateProvider';

import './Chat.css';

const Chat = () => {
  const { user } = useContext(StateContext);
  const { roomId } = useParams();
  const [input, setInput] = useState('');
  const [roomName, setRoomName] = useState('');
  const [messages, setMessages] = useState([]);
  // console.log(user.displayName);
  useEffect(() => {
    if (roomId) {
      const roomRef = doc(db, 'rooms', roomId);
      getDoc(roomRef).then((doc) => setRoomName(doc.data().name));

      const q = query(
        collection(db, 'rooms', roomId, 'messages'),
        orderBy('timestamp', 'desc')
      );
      const unsubscribe = onSnapshot(q, (snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
      return unsubscribe;
    }
  }, [roomId]);
  console.log(messages);

  const sendMessage = async (e) => {
    e.preventDefault();
    const messageDocRef = doc(
      db,
      'rooms',
      roomId,
      'messages',
      `message${Date.now()}`
    );
    const payload = {
      timestamp: Timestamp.now(),
      text: input,
      username: user.displayName,
    };
    await setDoc(messageDocRef, payload);
    setInput('');
  };

  // console.log(message);
  return (
    <div className='chat'>
      <div className='chat__header'>
        <Avatar src={`https://avatars.dicebear.com/api/human/${roomId}.svg`} />

        <div className='chat__headerInfo'>
          <h3>{roomName}</h3>
          <p>
            Last seen{' '}
            {new Date(
              messages[messages.length - 1]?.data.timestamp?.toDate()
            ).toUTCString() || `...`}
          </p>
        </div>

        <div className='chat__headerRight'>
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className='chat__body'>
        {messages.map((message) => (
          <p
            key={message.id}
            className={`chat__message ${
              message.data.username === user.displayName && 'chat__reciever'
            }`}
          >
            <span className='chat__name'>{message.data.username}</span>
            {message.data.text}
            <span className='chat__timestamp'>
              {new Date(message.data.timestamp?.toDate()).getUTCMinutes()}:
              {new Date(message.data.timestamp?.toDate()).getUTCSeconds()}
            </span>
          </p>
        ))}
      </div>
      <div className='chat__footer'>
        <EmojiEmotionsIcon />
        <form>
          <input
            type='text'
            placeholder='Type a message...'
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type='submit' onClick={sendMessage}>
            Send a message
          </button>
        </form>
        <MicIcon />
      </div>
    </div>
  );
};

export default Chat;
