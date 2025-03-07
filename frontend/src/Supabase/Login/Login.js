import supabase from '../supabase.config'


export async function login(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      console.error('Error logging in:', error);
    } else {
      return data
    }
  }