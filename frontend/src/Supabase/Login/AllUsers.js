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
