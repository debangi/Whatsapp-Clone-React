import React, { useEffect, useState } from 'react';

import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase-config';

import { Avatar, IconButton } from '@mui/material';
import SearchOutlined from '@mui/icons-material/SearchOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import MicIcon from '@mui/icons-material/Mic';
import { useParams } from 'react-router';

import './Chat.css';

const Chat = () => {
  const { roomId } = useParams();
  // const [seed, setSeed] = useState('');
  const [input, setInput] = useState('');
  const [roomName, setRoomName] = useState('');

  useEffect(() => {
    if (roomId) {
      const docRef = doc(db, 'rooms', roomId);
      getDoc(docRef).then((doc) => setRoomName(doc.data().name));
    }
  }, [roomId]);

  // useEffect(() => {
  //   setSeed(Math.floor(Math.random() * 5000));
  // }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    setInput('');
  };

  return (
    <div className='chat'>
      <div className='chat__header'>
        <Avatar src={`https://avatars.dicebear.com/api/human/${roomId}.svg`} />

        <div className='chat__headerInfo'>
          <h3>{roomName}</h3>
          <p>Last seen at...</p>
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
        <p className={`chat__message ${true && 'chat__reciever'}`}>
          <span className='chat__name'>Debangi</span>
          hey guys
          <span className='chat__timestamp'>4:78pm</span>
        </p>
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
