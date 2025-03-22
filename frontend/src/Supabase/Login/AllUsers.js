import supabase from '../supabase.config';

export const fetchUsers = async () => {
    const { data, error } = await supabase
      .from('admin_users')
      .select('*');
  
    if (error) {
      console.error('Error fetching users:', error.message);
      return [];
    }
    return data;
  };

  export const fetchClientsUsers = async () => {
    const { data, error } = await supabase
      .from('client_users')
      .select('*');
  
    if (error) {
      console.error('Error fetching users:', error.message);
      return [];
    }
    return data;
  };
