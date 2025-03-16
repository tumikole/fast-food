import supabase from '../supabase.config'


export const addMenuItems = async (menuItems) => {
    try {
      for (const category of menuItems) {
        for (const item of category.images) {
          const { data, error } = await supabase
            .from('menu_items')
            .insert([{
              category: category.category,
              itemName: item.itemName,
              imageItem: item.imageItem,
              ingredients: JSON.stringify(item.ingredients), // Store ingredients as JSON
              totalAmount: item.totalAmount,
              quantity: item.quantity
            }]);
  
          if (error) {
            console.error(`Error adding ${item.itemName}:`, error.message);
          } else {
          }
        }
      }
    } catch (err) {
      console.error('Error adding menu items:', err);
    }
  };