import supabase from '../supabase.config';

// Example fetchMessages function to fix query structure
export const fetchMessages = async (currentUser, selectedUser) => {
  try {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .or(`sender.eq.${currentUser},receiver.eq.${currentUser}`)
      .or(`sender.eq.${selectedUser},receiver.eq.${selectedUser}`)
      .order('created_at', { ascending: true });

    if (error) {
      throw new Error('Error fetching messages: ' + error.message);
    }

    return data;
  } catch (error) {
    console.error('Error fetching messages:', error);
    return [];
  }
};




export const sendMessage = async (newMessage, senderUsername, receiverUsername, imageUrl = null) => {
  if (newMessage.trim() === '') return;
  try {
    const { error } = await supabase
      .from('messages')
      .insert([
        {
          content: newMessage,
          sender: senderUsername,
          receiver: receiverUsername,
          created_at: new Date().toISOString(),
        },
      ]);

    if (error) {
      throw new Error('Error sending message: ' + error.message);
    }
  } catch (error) {
    console.error('Error sending message:', error.message);
  }
};

// In Supabase/Messaging/Messaging.js
export const subscribeToMessages = (currentUser, selectedUser, callback) => {
  return supabase
    .channel('realtime:public:messages')
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, (payload) => {
      const newMessage = payload.new;

      // Only trigger the callback if the new message is relevant to the current chat (either sender or receiver)
      if (
        (newMessage.sender === currentUser && newMessage.receiver === selectedUser) ||
        (newMessage.sender === selectedUser && newMessage.receiver === currentUser)
      ) {
        callback(newMessage);
      }
    })
    .subscribe();
};
