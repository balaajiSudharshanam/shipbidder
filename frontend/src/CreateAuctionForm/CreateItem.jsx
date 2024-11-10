import { TextField, Typography, Button, Grid, Box, FormControlLabel, Checkbox, Avatar } from '@mui/material';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { userState } from '../context/UserContextProvider';
import { useFormState } from '../context/FormContextProvide';
import CreateLocation from './CreateLocation';
import AuctionForm from './AuctionForm';
import { useMultiStepForm } from '../../CustomHooks/useMultiStepForm';

const CreateItem = () => {
    const { user } = userState();
    const { itemFormData, setItemFormData } = useFormState();
    const steps = [
        <CreateLocation />,
        <CreateItem />,
        <AuctionForm />
      ];
      const { currentStep, step, back, next } = useMultiStepForm(steps);
    const [preview, setPreview] = useState(null); 

    useEffect(() => {
        setItemFormData((prevData) => ({
            ...prevData,
            createdBy: user.id, 
        }));
    }, [user.id, setItemFormData]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setItemFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setPreview(URL.createObjectURL(file));

        const data = new FormData();
        data.append('file', file);
        data.append('upload_preset', 'chatapp');  
        data.append('cloud_name', 'djlishmg4');    

        try {
            const response = await axios.post('https://api.cloudinary.com/v1_1/djlishmg4/image/upload', data);
            const imageUrl = response.data.secure_url;
            setItemFormData((prevData) => ({
                ...prevData,
                pic: imageUrl,  
            }));
            console.log('Image uploaded successfully:', imageUrl);
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    return (
        <Box component="form" sx={{ p: 3 }}>
            
            
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h6">Upload Picture</Typography>
                    <Box display="flex" alignItems="center" gap={2}>
                        {preview && <Avatar src={preview} alt="Image preview" sx={{ width: 56, height: 56 }} />}
                        <Button variant="contained" component="label">
                            Upload File
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                hidden
                            />
                        </Button>
                    </Box>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Height"
                        name="height"
                        value={itemFormData.height}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Length"
                        name="length"
                        value={itemFormData.length}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Width"
                        name="width"
                        value={itemFormData.width}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Weight"
                        name="weight"
                        value={itemFormData.weight}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                </Grid>

                <Grid item xs={6}>
                    <TextField
                        label="Category"
                        name="category"
                        value={itemFormData.category}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                </Grid>

                <Grid item xs={6}>
                    <TextField
                        label="Subcategory"
                        name="subCategory"
                        value={itemFormData.subCategory}
                        onChange={handleChange}
                        fullWidth
                    />
                </Grid>

                <Grid item xs={12}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                name="isFragile"
                                checked={itemFormData.isFragile}
                                onChange={handleChange}
                            />
                        }
                        label="Is Fragile"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                name="isHazardous"
                                checked={itemFormData.isHazardous}
                                onChange={handleChange}
                            />
                        }
                        label="Is Hazardous"
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        label="Description"
                        name="description"
                        value={itemFormData.description}
                        onChange={handleChange}
                        fullWidth
                        multiline
                        rows={4}
                    />
                </Grid>
            </Grid>
        </Box>
    );
};

export default CreateItem;
