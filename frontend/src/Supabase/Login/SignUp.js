import supabase from '../supabase.config'

async function signUp(email, password) {
  console.log({ email, password });
  const { data, error } = await supabase.auth.signUp({ email, password });
  console.log({ data });
  if (error) {
    // Check if the error message indicates the user already exists.
    if (error.message.toLowerCase().includes('already registered')) {
      console.error('User already exists:', error);
      return { error: 'User already exists' };
    } else {
      console.error('Error signing up:', error);
      return { error: error.message };
    }
  } else {
    console.log('Sign up successful:', data);
    return { data };
  }
}

export default signUp;
