import React, { useState, useEffect } from 'react';
import {
    Box,
    Button,
    Modal,
    TextField,
    Typography,
    IconButton,
    Divider,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { editMenuItem, deleteMenuItem } from '../../../Supabase/addMenuItems/addMenuItems';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    maxWidth: 600,
    maxHeight: '90vh',
    overflowY: 'auto',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
};

const EditDeleteModal = ({ open, onClose, item, fetchAllMenuItems, setMessage }) => {
    const [itemName, setItemName] = useState('');
    const [totalAmount, setTotalAmount] = useState('0.00');
    const [imageUrl, setImageUrl] = useState('');
    const [ingredients, setIngredients] = useState([]);

    useEffect(() => {
        if (item) {
            setItemName(item.itemName);
            setTotalAmount(item.totalAmount);
            setImageUrl(item.imageUrl);

            // Check if the item category is "Kota"
            if (item.category === "Kota") {
                // If it's "Kota", ingredients are an array of strings
                setIngredients(item.ingredients || []);
            } else {
                // Otherwise, ingredients are an array of objects
                setIngredients(item.ingredients || []);
            }
        }
    }, [item]); // Re-run whenever the item changes

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageUrl(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleIngredientChange = (index, value, field) => {
        const updatedIngredients = [...ingredients];

        if (item.category === "Kota") {
            updatedIngredients[index] = value; // For Kota, ingredients are just strings
        } else {
            if (field === 'ingredient') {
                updatedIngredients[index].ingredient = value; // Update ingredient name
            } else if (field === 'amount') {
                updatedIngredients[index].totalAmount = value; // Update totalAmount
            }
        }
        setIngredients(updatedIngredients); // Set updated ingredients
    };


    const handleAddIngredient = () => {
        if (item.category === "Kota") {
            setIngredients([...ingredients, '']); // For Kota, add an empty string
        } else {
            setIngredients([...ingredients, { ingredient: '', totalAmount: '' }]); // For other categories, add an empty object
        }
    };

    const handleRemoveIngredient = (index) => {
        const updatedIngredients = ingredients.filter((_, i) => i !== index);
        setIngredients(updatedIngredients);
    };

    const handleEdit = async () => {
        const updatedData = { itemName, totalAmount, imageUrl, ingredients };

        try {
            const data = await editMenuItem(item.id, updatedData);  // Calling the editMenuItem function

            if (data.status === "Ok") {
                onClose();  // Close the modal after the update is successful
                setMessage({ success: `${item.itemName} updated successfully` });  // Show success message
                await fetchAllMenuItems();  // Refresh the menu items
                setTimeout(async () => {
                    setMessage("");  // Clear the message after 5 seconds
                }, 3000);
            }
        } catch (error) {
            console.error('Error updating menu item:', error);
            alert('An unexpected error occurred while updating the menu item.');
        }
    };


    const handleDelete = async () => {
        const data = await deleteMenuItem(item.id);
        if (data.status === "Ok") {
            onClose();
            setMessage({ success: `${item.itemName} deleted successfully` });
            await fetchAllMenuItems();
            setTimeout(async () => {
                setMessage("");
            }, 3000);
        }

    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="edit-delete-modal-title"
            aria-describedby="edit-delete-modal-description"
        >
            <Box sx={style}>
                {/* Header */}
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h6" component="h2">
                        Edit or Delete {item && item.itemName} | {item && item.category}
                    </Typography>
                    <IconButton onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                <Divider />

                {/* Content */}
                {item && (
                    <Box mt={2}>
                        <Box mt={2} mb={2}>
                            <img
                                src={imageUrl ? imageUrl : item.imageUrl}
                                alt={itemName}
                                style={{ width: '100%', height: 'auto', marginBottom: 10 }}
                            />
                            <Button
                                variant="contained"
                                component="label"
                                sx={{ marginBottom: 2 }}
                            >
                                Change Image
                                <input
                                    type="file"
                                    hidden
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                />
                            </Button>
                        </Box>
                        <TextField
                            fullWidth
                            label="Item Name"
                            variant="outlined"
                            value={itemName}
                            onChange={(e) => setItemName(e.target.value)}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Total Amount"
                            variant="outlined"
                            value={totalAmount}
                            onChange={(e) => setTotalAmount(e.target.value)}
                            margin="normal"
                            type="number"
                        />
                        <Typography variant="h6" mt={2}>
                            Ingredients
                        </Typography>
                        {ingredients.map((ingredient, index) => (
                            <Box key={index} display="flex" alignItems="center" gap={1} mb={1}>
                                {item.category === "Kota" ? (
                                    // For "Kota", show an input for string ingredients
                                    <TextField
                                        fullWidth
                                        label={`Ingredient ${index + 1}`}
                                        variant="outlined"
                                        value={ingredient} // For Kota, ingredient is a string
                                        onChange={(e) => handleIngredientChange(index, e.target.value, 'ingredient')}
                                    />
                                ) : (
                                    // For other categories, show inputs for both ingredient and totalAmount
                                    <Box display="flex" gap={1}>
                                        <TextField
                                            fullWidth
                                            label={`Ingredient ${index + 1}`}
                                            variant="outlined"
                                            value={ingredient.ingredient} // For other categories, ingredient is an object
                                            onChange={(e) => handleIngredientChange(index, e.target.value, 'ingredient')}
                                        />
                                        <TextField
                                            fullWidth
                                            label="Amount"
                                            variant="outlined"
                                            value={ingredient.totalAmount} // For other categories, totalAmount is part of the object
                                            onChange={(e) => handleIngredientChange(index, e.target.value, 'amount')}
                                        />
                                    </Box>
                                )}
                                <IconButton color="error" onClick={() => handleRemoveIngredient(index)}>
                                    <DeleteIcon />
                                </IconButton>
                            </Box>
                        ))}
                        <Button
                            variant="outlined"
                            onClick={handleAddIngredient}
                            startIcon={<AddIcon />}
                            sx={{ marginBottom: 2 }}
                        >
                            Add Ingredient
                        </Button>
                    </Box>
                )}

                {/* Footer */}
                <Divider sx={{ my: 2 }} />
                <Box display="flex" justifyContent="space-between" mt={3}>
                    <Button
                        variant="outlined"
                        onClick={handleEdit}
                        startIcon={<AddIcon color="green" />}
                        sx={{ marginBottom: 2 }}
                    >
                        Update
                    </Button>

                    <Button
                        variant="outlined"
                        onClick={handleDelete}
                        startIcon={<DeleteIcon />}
                        sx={{ marginBottom: 2 }}
                    >
                        Delete
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default EditDeleteModal;
