import supabase from '../supabase.config';

  export const fetchMessages = async () => {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching messages:', error.message);
    } else {
      setMessages(data);
    }
  };

  // Send a new message
  export const sendMessage = async () => {
    if (newMessage.trim() === '') return;

    const { error } = await supabase
      .from('messages')
      .insert([{ content: newMessage, sender: username }]);

    if (error) {
      console.error('Error sending message:', error.message);
    } else {
      setNewMessage('');
    }
  };

  // Listen for new messages in real-time
  