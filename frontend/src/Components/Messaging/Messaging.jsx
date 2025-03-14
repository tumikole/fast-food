import React, { useState, useEffect } from 'react';
import { Box, Typography, Avatar, IconButton, Divider, TextField, Paper } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SendIcon from '@mui/icons-material/Send';
import { fetchMessages, sendMessage, subscribeToMessages } from '../../Supabase/Messaging/Messaging';
import { fetchUsers } from '../../Supabase/Login/AllUsers';

const Messaging = ({ userDetails }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [unreadMessages, setUnreadMessages] = useState({}); // Tracks unread messages count for each user

  useEffect(() => {
    // Fetch users for selection
    const loadUsers = async () => {
      const usersList = await fetchUsers();
      setUsers(usersList);
      console.log("Users List:", usersList); // Debugging log
    };

    loadUsers();
  }, []);

  useEffect(() => {
    const loadMessages = async () => {
      if (selectedUser) {
        const currentUser = userDetails.username;
        const initialMessages = await fetchMessages(currentUser, selectedUser.username);
        setMessages(initialMessages);
        console.log("Initial Messages:", initialMessages); // Debugging log

        // Set up real-time messaging subscription
        const realTimeSubscription = subscribeToMessages(
          currentUser,
          selectedUser.username,
          (newMessage) => {
            console.log('New Message Received:', newMessage);  // Debugging log

            setMessages((prevMessages) => [...prevMessages, newMessage]);

            // If the selected user is not the one receiving the message, increase unread count
            if (selectedUser.username !== newMessage.sender) {
              setUnreadMessages((prevUnread) => {
                const newUnread = { ...prevUnread };
                newUnread[newMessage.sender] = (newUnread[newMessage.sender] || 0) + 1;
                console.log('Updated Unread Messages:', newUnread); // Debugging log
                return newUnread;
              });
            }
          }
        );

        // Cleanup the subscription when the component is unmounted or user switches chat
        return () => {
          realTimeSubscription.unsubscribe();
        };
      }
    };

    loadMessages();
  }, [selectedUser, userDetails]);

  const handleSendMessage = async () => {
    if (message.trim()) {
      const senderUsername = userDetails.username;
      const receiverUsername = selectedUser.username;
      
      await sendMessage(message, senderUsername, receiverUsername);
      
      setMessage('');
    }
  };

  const handleBackClick = () => {
    setSelectedUser(null);
  };

  const handleUserClick = (user) => {
    // When user selects a user, reset unread message count for that user
    setSelectedUser(user);
    setUnreadMessages((prevUnread) => ({
      ...prevUnread,
      [user.username]: 0, // Reset unread messages when entering chat
    }));
  };

  return (
    <Box m={0} p={0} sx={{ width: '100%', height: '100vh', backgroundColor: '#ECE5DD', display: 'flex', flexDirection: 'column' }}>
      {!selectedUser ? (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          {/* Header */}
          <Box p={2} sx={{ backgroundColor: '#075E54', color: '#fff', borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }}>
            <Typography variant="h6">Select User to Chat</Typography>
          </Box>
          {/* User List */}
          <Box sx={{ flex: 1, overflowY: 'auto', padding: 2 }}>
            {users.map((user) => (
              <Box
                key={user.username}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                  marginBottom: 1,
                  padding: 2,
                  borderRadius: 2,
                  boxShadow: 1,
                  backgroundColor: '#fff',
                  '&:hover': {
                    backgroundColor: '#f0f0f0',
                  },
                }}
                style={{ display: user.username === userDetails.username && 'none' }}
                onClick={() => handleUserClick(user)}
              >
                <Avatar sx={{ marginRight: 2 }} />
                <Typography variant="body1" sx={{ flexGrow: 1 }}>
                  {user.username}
                </Typography>
                {/* Display unread message count */}
                {unreadMessages[user.username] > 0 && (
                  <Box sx={{ backgroundColor: '#ff3b30', color: '#fff', borderRadius: '50%', padding: '0.5rem', fontSize: '0.75rem' }}>
                    {unreadMessages[user.username]}
                  </Box>
                )}
              </Box>
            ))}
          </Box>
        </Box>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          {/* Chat Header */}
          <Box p={2} sx={{ backgroundColor: '#075E54', color: '#fff', display: 'flex', alignItems: 'center', borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }}>
            <IconButton onClick={handleBackClick} sx={{ color: '#fff' }}>
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h6" sx={{ marginLeft: 2 }}>
              Chat with {selectedUser.username}
            </Typography>
          </Box>
          <Divider />
          {/* Chat Messages */}
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
                <Avatar sx={{ marginRight: 1, marginLeft: msg.sender === userDetails.username ? 0 : 2 }} />
                <Paper sx={{ padding: 2, borderRadius: 2, maxWidth: '60%', backgroundColor: msg.sender === userDetails.username ? '#DCF8C6' : '#fff' }}>
                  <Typography variant="body2">{msg.content}</Typography>
                </Paper>
              </Box>
            ))}
          </Box>
          <Divider />
          {/* Send Message */}
          <Box
            sx={{
              padding: 2,
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#fff',
              position: 'sticky',
              bottom: 0,
              zIndex: 1,
              boxShadow: '0 -2px 5px rgba(0, 0, 0, 0.1)',
            }}
          >
            <TextField
              variant="outlined"
              fullWidth
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message"
              sx={{ marginRight: 2, borderRadius: 20, backgroundColor: '#f1f1f1' }}
            />
            <IconButton onClick={handleSendMessage} sx={{ color: '#075E54' }}>
              <SendIcon />
            </IconButton>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Messaging;
