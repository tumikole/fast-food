import supabase from '../supabase.config';

export const addOrdererInformation = async (name, phoneNumber, address, notes) => {
    try {
        const { data, error } = await supabase
            .from('orderer_information')
            .insert([
                {
                    name,        // Assuming these are the fields in your table
                    phone_number: phoneNumber,
                    address,
                    notes,
                    order_date: new Date(),  // Add a timestamp or other fields as needed
                }
            ]);

        if (error) {
            console.error('Error inserting orderer information:', error);
            throw error;
        }
        console.log('Orderer information saved successfully:', data);
        return data;
    } catch (error) {
        console.error('Error in addOrdererInformation:', error);
        throw error;
    }
};
