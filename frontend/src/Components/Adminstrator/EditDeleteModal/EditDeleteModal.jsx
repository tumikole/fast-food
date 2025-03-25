import React, { useState, useEffect } from 'react';
import {
    Box,
    Button,
    TextField,
    Typography,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    Chip,
} from '@mui/material';
import { Delete, Add, Close, Save, CameraAlt } from '@mui/icons-material';
import { updateMenuItem, deleteMenuItem } from '../../../Supabase/addMenuItems/addMenuItems';
import './EditDeleteModal.scss';

const EditDeleteModal = ({ open, onClose, item, fetchAllMenuItems, setMessage, setFilteredCategory }) => {
    const [itemName, setItemName] = useState('');
    const [totalAmount, setTotalAmount] = useState('0.00');
    const [imageUrl, setImageUrl] = useState('');
    const [ingredients, setIngredients] = useState([]);
    const [nutrition, setNutrition] = useState('');


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
        const updatedData = { itemName, totalAmount, imageUrl, ingredients, nutrition };

        try {
            const data = await updateMenuItem(item.id, updatedData);  // Calling the editMenuItem function

            if (data.status === "Ok") {
                onClose();  // Close the modal after the update is successful
                setMessage({ success: `${item.itemName} updated successfully` });  // Show success message
                await fetchAllMenuItems();  // Refresh the menu items
        setFilteredCategory("All")

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
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: '20px',
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(10px)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                }
            }}
        >
            <DialogTitle sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
                padding: '20px 24px',
            }}>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    {item?.itemName}
                </Typography>
                <Chip
                    label={item?.category}
                    sx={{
                        background: 'linear-gradient(45deg, #FF6B6B, #FF8E53)',
                        color: 'white',
                        fontWeight: 'bold',
                    }}
                />
                <IconButton onClick={onClose} size="small">
                    <Close />
                </IconButton>
            </DialogTitle>

            <DialogContent sx={{ padding: '24px' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {/* Image Section */}
                    <Box sx={{ position: 'relative' }}>
                        <img
                            src={imageUrl || item?.imageUrl}
                            alt={itemName}
                            style={{
                                width: '100%',
                                height: '300px',
                                objectFit: 'cover',
                                borderRadius: '16px',
                            }}
                        />
                        <Button
                            component="label"
                            sx={{
                                position: 'absolute',
                                bottom: '16px',
                                right: '16px',
                                background: 'rgba(255, 255, 255, 0.9)',
                                borderRadius: '8px',
                                '&:hover': {
                                    background: 'rgba(255, 255, 255, 1)',
                                }
                            }}
                            startIcon={<CameraAlt />}
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

                    {/* Item Details */}
                    <TextField
                        label="Item Name"
                        value={itemName}
                        onChange={(e) => setItemName(e.target.value)}
                        fullWidth
                        variant="outlined"
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                background: 'rgba(255, 255, 255, 0.8)',
                            }
                        }}
                    />

                    {item?.category === "Kota" &&
                        <TextField
                            label="Total Amount"
                            type="number"
                            value={totalAmount}
                            onChange={(e) => setTotalAmount(e.target.value)}
                            fullWidth
                            variant="outlined"
                            InputProps={{
                                startAdornment: <Typography sx={{ mr: 1 }}>R</Typography>
                            }}
                        />}

                    {/* Nutrition Section for Kota */}
                    {item?.category === "Kota" && (
                        <FormControl component="fieldset">
                            <Typography variant="subtitle2" sx={{ mb: 1 }}>Nutrition Type</Typography>
                            <RadioGroup
                                row
                                value={nutrition}
                                onChange={(e) => setNutrition(e.target.value)}
                            >
                                <FormControlLabel
                                    value="Veg"
                                    control={<Radio color="success" />}
                                    label={<Typography color="success.main">Veg</Typography>}
                                />
                                <FormControlLabel
                                    value="Non-veg"
                                    control={<Radio color="error" />}
                                    label={<Typography color="error.main">Non-veg</Typography>}
                                />
                            </RadioGroup>
                        </FormControl>
                    )}

                    {/* Ingredients Section */}
                    <Box sx={{
                        background: 'rgba(245, 247, 250, 0.95)',
                        borderRadius: '16px',
                        padding: '20px',
                    }}>
                        <Typography variant="h6" sx={{
                            fontWeight: 600,
                            marginBottom: '16px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}>
                            <span>Ingredients</span>
                            <Button
                                variant="contained"
                                onClick={handleAddIngredient}
                                startIcon={<Add />}
                                sx={{
                                    background: 'linear-gradient(45deg, #FF6B6B, #FF8E53)',
                                    color: 'white',
                                }}
                            >
                                Add Ingredient
                            </Button>
                        </Typography>

                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {ingredients.map((ingredient, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '12px',
                                        background: 'white',
                                        padding: '12px',
                                        borderRadius: '8px',
                                        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                                    }}
                                >
                                    {item?.category === "Kota" ? (
                                        <TextField
                                            fullWidth
                                            label={`Ingredient ${index + 1}`}
                                            value={ingredient}
                                            onChange={(e) => handleIngredientChange(index, e.target.value, 'ingredient')}
                                            variant="outlined"
                                            size="small"
                                        />
                                    ) : (
                                        <>
                                            <TextField
                                                fullWidth
                                                label={`Ingredient ${index + 1}`}
                                                value={ingredient.ingredient}
                                                onChange={(e) => handleIngredientChange(index, e.target.value, 'ingredient')}
                                                variant="outlined"
                                                size="small"
                                            />
                                            <TextField
                                                label="Amount"
                                                value={ingredient.totalAmount}
                                                onChange={(e) => handleIngredientChange(index, e.target.value, 'amount')}
                                                variant="outlined"
                                                size="small"
                                                sx={{ width: '150px' }}
                                                InputProps={{
                                                    startAdornment: <Typography sx={{ mr: 0.5 }}>R</Typography>
                                                }}
                                            />
                                        </>
                                    )}
                                    <IconButton
                                        onClick={() => handleRemoveIngredient(index)}
                                        sx={{ color: '#FF6B6B' }}
                                    >
                                        <Delete />
                                    </IconButton>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                </Box>
            </DialogContent>

            <DialogActions sx={{
                padding: '16px 24px',
                borderTop: '1px solid rgba(0, 0, 0, 0.1)',
                gap: '12px'
            }}>
                <Button
                    variant="outlined"
                    onClick={handleDelete}
                    startIcon={<Delete />}
                    sx={{
                        color: '#FF6B6B',
                        borderColor: '#FF6B6B',
                        '&:hover': {
                            borderColor: '#FF6B6B',
                            background: 'rgba(255, 107, 107, 0.1)'
                        }
                    }}
                >
                    Delete
                </Button>
                <Button
                    variant="contained"
                    onClick={handleEdit}
                    startIcon={<Save />}
                    sx={{
                        background: 'linear-gradient(45deg, #FF6B6B, #FF8E53)',
                        color: 'white',
                        '&:hover': {
                            background: 'linear-gradient(45deg, #FF8E53, #FF6B6B)',
                        }
                    }}
                >
                    Save Changes
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditDeleteModal;
