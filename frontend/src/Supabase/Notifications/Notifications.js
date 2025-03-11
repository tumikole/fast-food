import supabase from '../supabase.config';

export const addNotification = async (note) => {
    try {
        const { data, error } = await supabase
            .from('notifications')
            .insert([{ note }]);

            console.log({data})
        if (error) {
            console.error('Error adding notification:', error.message);
            return;
        }

        console.log('Notification added:', data);
    } catch (err) {
        console.error('Unexpected error:', err);
    }
};

export const getNotifications = async () => {
    try {
        const { data, error } = await supabase
            .from('notifications')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;

        const now = new Date();

        // Filter and delete notifications older than 24 hours
        for (const notification of data) {
            const notificationDate = new Date(notification.created_at);
            const timeDifference = now - notificationDate;

            // 24 hours in milliseconds (24 * 60 * 60 * 1000)
            if (timeDifference > 24 * 60 * 60 * 1000) {
                await supabase
                    .from('notifications')
                    .delete()
                    .eq('id', notification.id);
            }
        }

        // Refetch notifications after deletion
        const { data: updatedData, error: refetchError } = await supabase
            .from('notifications')
            .select('*')
            .order('created_at', { ascending: false });

        if (refetchError) throw refetchError;
        return updatedData;
    } catch (err) {
        console.error('Error fetching notifications:', err.message);
        return [];
    }
};

export const deleteNotification = async (id) => {
    try {
        const { data, error } = await supabase
            .from('notifications')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Error deleting notification:', error.message);
            return;
        }

        console.log('Notification deleted:', data);
    } catch (err) {
        console.error('Unexpected error:', err);
    }
};

