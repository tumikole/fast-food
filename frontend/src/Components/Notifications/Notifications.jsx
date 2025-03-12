import React, { useState, useEffect } from 'react';
import { Box, Typography, List, ListItem, ListItemText, Button, Card, CardContent, TextField, IconButton, Divider } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { addNotification, getNotifications, deleteNotification } from '../../Supabase/Notifications/Notifications';
import supabase from '../../Supabase/supabase.config';

const COUNTDOWN_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

const Notifications = ({ user, userId }) => {
    const [notifications, setNotifications] = useState([]);
    const [note, setNote] = useState("");

    useEffect(() => {
        // Fetch initial notifications
        const fetchNotifications = async () => {
            const data = await getNotifications();
            setNotifications(data);
        };
        fetchNotifications();

        // Set up real-time subscription
        const notificationSubscription = supabase
            .channel('realtime:notifications')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'notifications' }, (payload) => {
                console.log('Change received!', payload);
                fetchNotifications();
            })
            .subscribe();

        // Clean up subscription on component unmount
        return () => {
            supabase.removeChannel(notificationSubscription);
        };
    }, []);

    useEffect(() => {
        // Update countdown every second
        const interval = setInterval(() => {
            setNotifications((prevNotifications) => [...prevNotifications]);
        }, 1000);

        return () => clearInterval(interval);
    }, [notifications]);

    const handleAddNotification = async () => {
        if (!note.trim()) return;
        await addNotification(note, user, userId);
        setNote("");
    };

    const handleDeleteNote = async (id) => {
        await deleteNotification(id);
    };

    // Calculate countdown to 24 hours from creation time
    const calculateCountdown = (createdAt) => {
        const now = new Date();
        const createdDate = new Date(createdAt);
        const targetTime = createdDate.getTime() + COUNTDOWN_DURATION;
        const difference = targetTime - now;

        if (difference <= 0) return "Expired";

        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / (1000 * 60)) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        return `${String(hours).padStart(2, '0')}h ${String(minutes).padStart(2, '0')}m ${String(seconds).padStart(2, '0')}s`;
    };
    console.log({ user, userId })

    return (
        <Box sx={{ p: 4, maxWidth: 600, margin: '0 auto' }}>
            <Card sx={{ mb: 4, p: 2, boxShadow: 3, borderRadius: 3 }}>
                <CardContent>
                    <Typography variant="h5" gutterBottom>
                        Add Notification
                    </Typography>
                    <TextField
                        label="Enter your notification"
                        fullWidth
                        margin="normal"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        variant="outlined"
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={handleAddNotification}
                        startIcon={<AddIcon />}
                        sx={{ mt: 2, py: 1.5, fontWeight: 'bold' }}
                    >
                        Send Notification
                    </Button>
                </CardContent>
            </Card>

            <Typography variant="h5" gutterBottom>
                Notification List
            </Typography>
            <List sx={{ width: '100%', bgcolor: 'background.paper', borderRadius: 2 }}>
                {notifications.map((notification) => (
                    <Card
                        key={notification.id}
                        sx={{
                            mb: 2,
                            p: 2,
                            borderRadius: 2,
                            boxShadow: 1,
                            backgroundColor: '#f5f5f5',
                            transition: 'transform 0.2s ease-in-out',
                            ':hover': { transform: 'scale(1.01)', backgroundColor: '#e0e0e0' },
                        }}
                    >
                        <CardContent>
                            <Typography variant="body1" sx={{ mb: 1.5 }}>
                                {notification.note}
                            </Typography>
                            <Divider sx={{ my: 1 }} />
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Typography>{notification.author}</Typography>
                                <Typography>|</Typography>

                                <Typography variant="body2" color="textSecondary">
                                    {calculateCountdown(notification.created_at)}
                                </Typography>
                                {
                                    userId === notification.authorId
                                        ?
                                        <IconButton
                                            edge="end"
                                            aria-label="delete"
                                            onClick={() => handleDeleteNote(notification.id)}
                                            sx={{ color: 'red' }}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                        :
                                        <IconButton
                                            edge="end"
                                            aria-label="delete"
                                            sx={{ color: 'grey' }}
                                        >
                                            <DeleteIcon />
                                        </IconButton>}
                            </Box>
                        </CardContent>
                    </Card>
                ))}
            </List>

            {notifications.length === 0 && (
                <Typography variant="body1" color="textSecondary" sx={{ mt: 2, textAlign: 'center' }}>
                    No notifications available.
                </Typography>
            )}
        </Box>
    );
};

export default Notifications;
