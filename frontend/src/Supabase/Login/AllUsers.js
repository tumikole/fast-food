import supabase from '../supabase.config';

export async function getAllUsers() {
    try {
        // Fetch all users from the Supabase authentication system
        const { data, error } = await supabase.auth.getAllUsers();
console.log({data})
        // If there's an error, log and return the error message
        if (error) {
            console.error('Error fetching users:', error.message);
            return { error: error.message };  // Return the error message
        }

        // If successful, log and return the data
        console.log('Users fetched successfully:', data);
        return { data };  // Return the data
    } catch (error) {
        // Catch and log any other errors (e.g., network issues)
        console.error('Error fetching users:', error);
        return { error: error.message };  // Return the error message
    }
}

export default getAllUsers;
