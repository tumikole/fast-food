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
  const base64Image = await convertToBase64(imageUrl);
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

    if (error) {
      console.error(`Error adding ${itemName}:`, error.message);
      alert(`Failed to add ${itemName}: ${error.message}`);
    } else {
      return { data, message: `Successfully added ${itemName}`, status: 'Ok' };
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
      return data;
    }
  } catch (err) {
    console.error('Error fetching menu items:', err);
    alert('An unexpected error occurred while fetching menu items.');
    return [];
  }
};


export const deleteMenuItem = async (id) => {
  try {
    const { data, error } = await supabase
      .from('menu_items')
      .delete()
      .eq('id', id);

    if (error) {
      console.error(`Error deleting menu item with ID ${id}:`, error.message);
      alert(`Failed to delete menu item: ${error.message}`);
    } else {
      return { data, message: `Successfully deleted`, status: 'Ok' };
    }
  } catch (err) {
    console.error('Error deleting menu item:', err);
    alert('An unexpected error occurred while deleting menu item.');
  }
};

export const editMenuItem = async (id, updatedData) => {
  try {
    const { data, error } = await supabase
      .from('menu_items')
      .update(updatedData)
      .eq('id', id);

    if (error) {
      console.error(`Error updating menu item with ID ${id}:`, error.message);
      alert(`Failed to update menu item: ${error.message}`);
    } else {
      return { data, message: `Successfully updated`, status: 'Ok' };
    }
  } catch (err) {
    console.error('Error updating menu item:', err);
    alert('An unexpected error occurred while updating menu item.');
  }
};