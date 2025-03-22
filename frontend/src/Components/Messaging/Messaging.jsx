import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, Avatar, IconButton, Divider, TextField, Paper } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
// import MicIcon from '@mui/icons-material/Mic';
// import StopIcon from '@mui/icons-material/Stop';
import { v4 as uuidv4 } from 'uuid';
import supabase from '../../Supabase/supabase.config';
import { fetchMessages, sendMessage, subscribeToMessages } from '../../Supabase/Messaging/Messaging';
import { fetchUsers } from '../../Supabase/Login/AllUsers';

const Messaging = ({ userDetails }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [unreadMessages, setUnreadMessages] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  // Ref for auto-scrolling
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const loadUsers = async () => {
      const usersList = await fetchUsers();
      setUsers(usersList);
    };

    loadUsers();
  }, []);

  useEffect(() => {
    const loadMessages = async () => {
      if (selectedUser) {
        const currentUser = userDetails.username;
        const initialMessages = await fetchMessages(currentUser, selectedUser.username);
        setMessages(initialMessages);

        const realTimeSubscription = subscribeToMessages(
          currentUser,
          selectedUser.username,
          (newMessage) => {
            setMessages((prevMessages) => [...prevMessages, newMessage]);

            if (selectedUser.username !== newMessage.sender) {
              setUnreadMessages((prevUnread) => {
                const newUnread = { ...prevUnread };
                newUnread[newMessage.sender] = (newUnread[newMessage.sender] || 0) + 1;
                return newUnread;
              });
            }
          }
        );

        return () => {
          realTimeSubscription.unsubscribe();
        };
      }
    };

    loadMessages();
  }, [selectedUser, userDetails]);


  const handleSendMessage = async () => {
    if (message.trim() || selectedImage) {
      const senderUsername = userDetails.username;
      const receiverUsername = selectedUser.username;

      let imageUrl = null;

      if (selectedImage) {
        const imagePath = `chat_images/${uuidv4()}-${selectedImage.name}`;
        const { data, error } = await supabase.storage
          .from('chat-uploads')
          .upload(imagePath, selectedImage);

        if (error) {
          console.error('Image upload failed:', error);
          return;
        }

        imageUrl = data?.path;
      }

      await sendMessage(message, senderUsername, receiverUsername, imageUrl);

      setMessage('');
      setSelectedImage(null);
    }
  };

  const handleBackClick = () => {
    setSelectedUser(null);
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setUnreadMessages((prevUnread) => ({
      ...prevUnread,
      [user.username]: 0,
    }));
  };

  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setSelectedImage(file);
  //   }
  // };

  // Scroll to the bottom whenever a new message is added
  useEffect(() => {
    if (messages.length > 0) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <Box  >
      {!selectedUser ? (
        <Box sx={{ flex: 1, overflowY: 'auto' }}>
          <Box
            sx={{
              padding: 2,
              backgroundColor: '#0066FF',
              color: '#fff',
              position: 'sticky',
              top: 0,
              zIndex: 1,
            }}
          >
            <Typography variant="h6">Select User to Chat</Typography>
          </Box>
          <Box sx={{ padding: 2 }}>
            {users.map((user) => (
              <Box
                key={user.username}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                  padding: 1,
                  marginBottom: 1,
                  borderRadius: 2,
                  boxShadow: 2,
                  backgroundColor: '#fff',
                  '&:hover': {
                    backgroundColor: '#E9F1FF',
                  },
                }}
                style={{ display: user.username === userDetails.username && 'none' }}
                onClick={() => handleUserClick(user)}
              >
                <Avatar sx={{ marginRight: 2, backgroundColor: '#007BFF' }} />
                <Typography variant="body1" sx={{ flexGrow: 1 }}>
                  {user.username}
                </Typography>
                {unreadMessages[user.username] > 0 && (
                  <Box
                    sx={{
                      backgroundColor: '#FF4D4D',
                      color: '#fff',
                      borderRadius: '50%',
                      padding: '0.5rem',
                      fontSize: '0.75rem',
                    }}
                  >
                    {unreadMessages[user.username]}
                  </Box>
                )}
              </Box>
            ))}
          </Box>
        </Box>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <Box
            p={2}
            sx={{
              backgroundColor: '#0066FF',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              position: 'sticky',
              top: 0,
              zIndex: 1,
            }}

          >
            <IconButton onClick={handleBackClick} sx={{ color: '#fff' }}>
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h6" sx={{ marginLeft: 2 }}>
              Chat with {selectedUser.username}
            </Typography>
          </Box>
          <Divider />
          <div></div>
          <Box sx={{ flex: 1, overflowY: 'auto', padding: 2 }}>
            
            {messages.map((msg, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  flexDirection: msg.sender === userDetails.username ? 'row-reverse' : 'row',
                  alignItems: 'flex-start',
                  marginBottom: 2,
                }}
              >
                <Avatar sx={{ marginRight: 1, marginLeft: msg.sender === userDetails.username ? 0 : 2, backgroundColor: '#007BFF' }} />
                <Paper sx={{ padding: 2, borderRadius: 2, maxWidth: '60%', backgroundColor: msg.sender === userDetails.username ? '#B7F7B1' : '#fff' }}>
                  <Typography variant="body2">{msg.content}</Typography>
                  {msg.imageUrl && (
                    <Box mt={1}>
                      <img src={msg.imageUrl} alt="uploaded" style={{ maxWidth: '100%', borderRadius: '8px' }} />
                    </Box>
                  )}
                </Paper>
              </Box>
            ))}
            <div ref={messagesEndRef} /> {/* This is the reference to the last message */}
          </Box>
          <Divider />
          <Box sx={{ display: 'flex', gap: 1, padding: 2, alignItems: 'center', backgroundColor: '#fff', position: 'sticky', bottom: 0, zIndex: 2 }}>
          <input
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              id="image-upload"
            // onChange={handleImageChange}
            />
            <label htmlFor="image-upload">
                <AttachFileIcon />
            </label>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              label="Type a message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <IconButton onClick={handleSendMessage}>
              <SendIcon />
            </IconButton>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Messaging;
