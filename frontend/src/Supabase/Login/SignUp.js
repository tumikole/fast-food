import supabase from '../supabase.config';
import bcrypt from 'bcryptjs'; // Import bcrypt

export const signUp = async (email, password, username, role) => {
  try {
    // Check if a user already exists with the same email
    const { data: existingUserByEmail, error: emailError } = await supabase
      .from('admin_users')
      .select('email')
      .eq('email', email); // No .single() here
    if (emailError) throw emailError;

    if (existingUserByEmail.length > 0) {
      return { error: 'This email is already registered. Please try a different email.', message: "This email is already registered. Please try a different email." };
    }

    // Check if a user already exists with the same username
    const { data: existingUserByUsername, error: usernameError } = await supabase
      .from('admin_users')
      .select('username')
      .eq('username', username); // No .single() here
    if (usernameError) throw usernameError;

    if (existingUserByUsername.length > 0) {
      return { error: 'This username is already taken. Please choose a different username.', message: "This username is already taken. Please choose a different username." };
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

    // Insert the user details with the hashed password into the 'admin_users' table
    const { data, error } = await supabase
      .from('admin_users')
      .insert([
        {
          username,
          email,
          password: hashedPassword, // Store the hashed password
          role,
        },
      ]);
    console.log({ data, error });

    if (error) {
      console.error('Error saving admin user:', error.message);
      return { error: 'There was an issue while creating your account. Please try again.' };
    } else {
      return { data, message: 'Account created successfully!' }; // Success message
    }
  } catch (error) {
    console.error('Error in sign up process:', error.message);
    return { error: 'An unexpected error occurred. Please try again later.' };
  }
};



export const clientSignUp = async (email, userCode, username, role) => {
  try {
    // Check if a client already exists with the same email
    const { data: existingClientByEmail, error: emailError } = await supabase
      .from('client_users')
      .select('email')
      .eq('email', email); // No .single() here
    if (emailError) throw emailError;

    if (existingClientByEmail.length > 0) {
      return { error: 'This email is already registered. Please try a different email.', message: "This email is already registered. Please try a different email." };
    }

    // Check if a client already exists with the same username
    const { data: existingClientByUsername, error: usernameError } = await supabase
      .from('client_users')
      .select('username')
      .eq('username', username); // No .single() here
    if (usernameError) throw usernameError;

    if (existingClientByUsername.length > 0) {
      return { error: 'This username is already taken. Please choose a different username.', message: "This username is already taken. Please choose a different username." };
    }

    // Insert the client details into the 'client_users' table
    const { data, error } = await supabase
      .from('client_users')
      .insert([
        {
          username,
          email,
          client_auth_code: userCode, // Store the provided user code
          role,
          active: true,
        },
      ]);
    console.log({ data, error });

    if (error) {
      console.error('Error saving client user:', error.message);
      return { error: 'There was an issue while creating your account. Please try again.', message: "There was an issue while creating your account. Please try again." };
    } else {
      return { data, message: 'Client account created successfully!' }; // Success message
    }
  } catch (error) {
    console.error('Error in client sign up process:', error.message);
    return { error: 'An unexpected error occurred. Please try again later.' };
  }
};
