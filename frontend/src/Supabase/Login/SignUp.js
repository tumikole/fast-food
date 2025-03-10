import supabase from '../supabase.config';

export async function signUp(email, password, username, role) {
  console.log({ email, password, username, role });

  // Sign up user and store username in metadata
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { username, role }, // Save username in user metadata
    },
  });

  if (error) {
    if (error.message.toLowerCase().includes('already registered')) {
      console.error('User already exists:', error);
      return { error: 'User already exists' };
    } else {
      console.error('Error signing up:', error);
      return { error: error.message };
    }
  }

  console.log('Sign up successful:', data);

  // Optional: Store the user in a separate "profiles" table
  if (data.user) {
    const { error: profileError } = await supabase
      .from('profiles') // Ensure you have a 'profiles' table in your database
      .insert([
        {
          id: data.user.id, // Use the same ID as the authentication user
          username: username,
          email: email,
        },
      ]);

    if (profileError) {
      console.error('Error saving profile:', profileError.message);
    } else {
      console.log('Profile saved successfully');
    }
  }

  return { data };
}

export default signUp;
