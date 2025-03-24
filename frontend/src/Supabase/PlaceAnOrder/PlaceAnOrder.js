import supabase from '../supabase.config';


export const addOrder = async (order, orderNumber, paymentMethod, name, phoneNumber, address, notes) => {
    try {
        const { data, error } = await supabase
            .from('orders')  // Table name
            .insert([{
                order_number: orderNumber,
                payment_method: paymentMethod,
                name: name,
                phone_number: phoneNumber,
                address: address,
                notes: notes,
                order_details: order,  // Storing entire order object
                order_status: "Pending"
            }]);

        if (error) {
            console.error('Error saving order:', error);
            return { success: false, error: error.message || 'Unknown error' };
        }
        return { success: true, data };

    } catch (err) {
        console.error('Error while adding order:', err.message);
        return { success: false, error: err.message };
    }
};

export const getOrderByNumber = async (orderNumber) => {
    const { data, error } = await supabase
        .from('orders') // Your table name
        .select('*') // Select all columns
        .eq('order_number', orderNumber)
        .single(); // Return a single object instead of an array

    if (error) {
        console.error('Error fetching order:', error);
        return { success: false, error: error.message || 'Unknown error' };
    }

    return { success: true, data };
};

export const getAllOrders = async () => {
    try {
        const { data, error } = await supabase
            .from('orders') // Your table name
            .select('*'); // Select all columns

        // If there is an error, handle it
        if (error) {
            console.error('Error fetching orders:', error);
            return { success: false, error: error.message || 'Unknown error' };
        }

        // Return data if successful
        return { success: true, data };
    } catch (err) {
        console.error('Unexpected error:', err);
        return { success: false, error: err.message || 'Unknown error' };
    }
};



export const updateOrderStatus = async (orderNumber, status) => {
    try {
        const { data, error } = await supabase
            .from('orders')  // Replace with your actual table name
            .update({ order_status: status })
            .eq('order_number', orderNumber);

        if (error) throw error;

        return { success: true, data };
    } catch (error) {
        console.error("Error updating order status:", error.message);
        return { success: false, error: error.message };
    }
};

export const updateOrderChef = async (orderId, username, updatedStatus) => {
    try {
        // Step 1: Update the order's chef to the provided username
        const { error: updateError } = await supabase
            .from('orders')  // Replace with your actual table name
            .update({ chef: username, order_status: updatedStatus })
            .eq('id', orderId); // Update the specific order by ID

        if (updateError) throw updateError;

        // Step 2: Fetch all orders for the given username (chef) and order them by latest
        const { data: ordersData, error: fetchError } = await supabase
            .from('orders')
            .select('*')
            .eq('chef', username) // Only fetch orders where the chef is the given username
            .order('created_at', { ascending: false }); // Order by created_at (latest first)

        if (fetchError) throw fetchError;

        return { success: true, orders: ordersData }; // Return updated orders
    } catch (error) {
        console.error("Error updating order status:", error.message);
        return { success: false, error: error.message };
    }
};


// useEffect(() => {
//     const storedOrder = localStorage.getItem('userOrdering');
//     if (storedOrder) {
//       setOrderData(JSON.parse(storedOrder));
//     }

//     // Real-time subscription to order updates
//     const orderSubscription = supabase
//       .from('orders')  // Listening to the orders table
//       .on('UPDATE', payload => {
//         if (payload.new.order_number === orderNumber) {
//           // Handle order update (e.g., update the UI with the new status)
//           console.log('Order updated:', payload.new);
//           Swal.fire('Order status updated!', `Your order status is now: ${payload.new.order_status}`, 'info');
//         }
//       })
//       .subscribe();

//     // Clean up the subscription when component unmounts
//     return () => {
//       supabase.removeSubscription(orderSubscription);
//     };
//   }, [orderNumber]);