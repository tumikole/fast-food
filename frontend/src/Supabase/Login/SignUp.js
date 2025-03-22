import supabase from '../supabase.config';
import bcrypt from 'bcryptjs'; // Import bcrypt

export const signUp = async (email, password, username, role) => {
  try {
    // Check if a user already exists with the same email or username
    const { data: existingUserByEmail, error: emailError } = await supabase
      .from('admin_users')
      .select('email')
      .eq('email', email)
      .single(); // Get single result, if any
    if (emailError) throw emailError;

    if (existingUserByEmail) {
      return { error: 'Email already exists' };
    }

    const { data: existingUserByUsername, error: usernameError } = await supabase
      .from('admin_users')
      .select('username')
      .eq('username', username)
      .single(); // Get single result, if any
    if (usernameError) throw usernameError;

    if (existingUserByUsername) {
      return { error: 'Username already exists' };
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
      return { error: error.message };
    } else {
      return { data }; // Return the inserted data
    }
  } catch (error) {
    console.error('Error in sign up process:', error.message);
    return { error: error.message };
  }
}


export const clientSignUp = async (email, userCode, username, role) => {
  try {
    // Check if a client already exists with the same email or username
    const { data: existingClientByEmail, error: emailError } = await supabase
      .from('client_users')
      .select('email')
      .eq('email', email)
      .single(); // Get single result, if any
    if (emailError) throw emailError;

    if (existingClientByEmail) {
      return { error: 'Email already exists' };
    }

    const { data: existingClientByUsername, error: usernameError } = await supabase
      .from('client_users')
      .select('username')
      .eq('username', username)
      .single(); // Get single result, if any
    if (usernameError) throw usernameError;

    if (existingClientByUsername) {
      return { error: 'Username already exists' };
    }

    // Insert the client details into the 'client_users' table
    const { data, error } = await supabase
      .from('client_users')
      .insert([
        {
          username,
          email,
          client_auth_code: userCode, // Store the user code
          role,
          active: true,
        },
      ]);
    console.log({ email, userCode, username, role });

    console.log({ data, error });
    if (error) {
      console.error('Error saving client user:', error.message);
      return { error: error.message };
    } else {
      return { data }; // Return the inserted data
    }
  } catch (error) {
    console.error('Error in sign up process:', error.message);
    return { error: error.message };
  }
}
  