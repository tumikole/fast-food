import React, { useState, useEffect } from 'react';
import { Box, Typography, List, ListItem, ListItemText, Button, Card, CardContent, TextField } from '@mui/material';
import { addNotification, getNotifications, deleteNotification } from '../../Supabase/Notifications/Notifications';
import supabase from '../../Supabase/supabase.config';

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [note, setNote] = useState("");

    useEffect(() => {
        // Fetch initial notifications
        const fetchNotifications = async () => {
            const data = await getNotifications();
            setNotifications(data);
        };
        fetchNotifications();

        // Set up realtime subscription
        const notificationSubscription = supabase
            .channel('realtime:notifications')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'notifications' }, (payload) => {
                console.log('Change received!', payload);

                // Refresh notifications when there is an insert or delete event
                fetchNotifications();
            })
            .subscribe();

        // Clean up subscription on component unmount
        return () => {
            supabase.removeChannel(notificationSubscription);
        };
    }, []);

    const handleAddNotification = async () => {
        if (!note.trim()) return;
        await addNotification(note);
        setNote("");
    };

    const handleDeleteNote = async (id) => {
        await deleteNotification(id)
    }

    return (
        <Box sx={{ p: 3 }}>
            <Card sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                    Add Notification
                </Typography>
                <CardContent>
                    <TextField
                        label="Note"
                        fullWidth
                        margin="normal"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={handleAddNotification}
                        sx={{ mt: 2 }}
                    >
                        Send Notification
                    </Button>
                </CardContent>
            </Card>
            <Typography variant="h6" gutterBottom>
                Notification List
            </Typography>
            <List>
                {notifications.map((notification) => (
                    <ListItem key={notification.id} divider>
                        <ListItemText
                            primary={notification.note}
                            secondary={new Date(notification.created_at).toLocaleString()}
                        />
                        <div onClick={() => handleDeleteNote(notification.id)}>
                            <box-icon name='trash' type='solid' color='#ff0000' ></box-icon>
                        </div>
                    </ListItem>
                ))}
            </List>
            {notifications.length === 0 && (
                <Typography variant="body1" color="textSecondary">
                    No notifications available.
                </Typography>
            )}
        </Box>
    );
};

export default Notifications;
