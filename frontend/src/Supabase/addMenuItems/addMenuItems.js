import supabase from '../supabase.config'

const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

export const addMenuItems = async (category, itemName, imageUrl, ingredients, totalAmount) => {
  console.log({category, itemName, imageUrl, ingredients, totalAmount})
  const base64Image = await convertToBase64(imageUrl);
console.log({base64Image})
  try {
    const { data, error } = await supabase
      .from('menu_items')
      .insert([{
        category,
        itemName,
        imageUrl: base64Image,
        ingredients, // Store ingredients as JSON
        totalAmount,
      }]);

      console.log({data, error})

    if (error) {
      console.error(`Error adding ${itemName}:`, error.message);
      alert(`Failed to add ${itemName}: ${error.message}`);
    } else {
      console.log(`Successfully added ${itemName}`);
      alert(`Successfully added ${itemName}`);
      return data;
    }
  } catch (err) {
    console.error('Error adding menu items:', err);
    alert('An unexpected error occurred while adding menu items.');
  }
};

export const getAllMenuItems = async () => {
  try {
    const { data, error } = await supabase
      .from('menu_items')
      .select('*'); // Fetch all columns

    if (error) {
      console.error('Error fetching menu items:', error.message);
      alert(`Failed to fetch menu items: ${error.message}`);
      return [];
    } else {
      console.log('Successfully fetched menu items:', data);
      return data;
    }
  } catch (err) {
    console.error('Error fetching menu items:', err);
    alert('An unexpected error occurred while fetching menu items.');
    return [];
  }
};



