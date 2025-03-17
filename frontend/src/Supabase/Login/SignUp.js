import supabase from '../supabase.config';
import bcrypt from 'bcryptjs'; // Import bcrypt

export const signUp = async (email, password, username, role) => {

  try {
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

export const  clientSignUp = async (email, userCode, username, role) => {

  try {
    const { data, error } = await supabase
      .from('admin_users')
      .insert([
        {
          username,
          email,
          client_auth_code: userCode, // Store the hashed password
          role,
          active: true
        },
      ]);

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