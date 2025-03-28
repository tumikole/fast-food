import supabase from '../supabase.config';
import bcrypt from 'bcryptjs';  // Assuming bcrypt is installed for password comparison
import { v4 as uuidv4 } from 'uuid';

export async function login(email, password) {
  const userToken = uuidv4();
  try {
    // Query the admin_users table to check if the user exists
    const { data, error } = await supabase
      .from('admin_users')
      .select('id, username, email, password, role')
      .eq('email', email)
      .single();  // Fetches a single user

    if (error) {
      console.error('Error fetching user:', error.message);
      return { error: 'User not found' };
    }

    // Compare the entered password with the stored hash
    const isPasswordValid = bcrypt.compareSync(password, data.password); // Assuming passwords are hashed

    if (!isPasswordValid) {
      console.error('Invalid password');
      return { error: 'Invalid password' };
    }

    // Store the user details in localStorage
    localStorage.setItem('user', JSON.stringify({
      id: data.id,
      username: data.username,
      email: data.email,
      role: data.role
    }));
    localStorage.setItem('auth-token', JSON.stringify({
      userToken
    }));

    return { data };
  } catch (error) {

    console.error('Error during login:', error.message);
    return { error: error.message };
  }
}

export async function clientLogin(userCode) {
  const userToken = uuidv4();
  try {
    // Query the admin_users table to check if the user exists
    const { data, error } = await supabase
      .from('client_users')
      .select('id, username, email, client_auth_code, active, role')
      .eq('client_auth_code', userCode)
      .single();  // Fetches a single user

    if (error) {
      console.error('Error fetching user:', error.message);
      return { error: 'User not found' };
    }
    // Store the user details in localStorage
    localStorage.setItem('user', JSON.stringify({
      id: data.id,
      username: data.username,
      email: data.email,
      authorized: data.active,
      role: data.role,
      auth: data.client_auth_code
    }));

    localStorage.setItem('auth-token', JSON.stringify({
      userToken
    }));

    return { data };
  } catch (error) {
    console.error('Error during login:', error.message);
    return { error: error.message };
  }
}