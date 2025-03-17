import React, { useState, useEffect } from 'react';
import supabase from '../../Supabase/supabase.config';
import {
  Box,
  Button,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
  CircularProgress,
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  Alert,
} from '@mui/material';
import { CameraAlt, Save, ArrowBack } from '@mui/icons-material';
import './Settings.scss';

const Settings = ({userDetails}) => {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState({ text: '', type: 'info' });
  const [activeStep, setActiveStep] = useState(0);

  const STORAGE_BUCKET = 'profilepictures';
  const PROFILE_TABLE = 'profilepictures';

  const steps = [
    { label: 'Upload Avatar', content: 'Upload your profile picture here.' },
    { label: 'Username', content: 'Change your username.' },
    { label: 'Password', content: 'Update your password.' },
  ];

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase
          .from(PROFILE_TABLE)
          .select('username, avatar_url')
          .eq('id', user.id)
          .single();

        if (error) {
          throw error;
        }

        if (data) {
          setUsername(data.username || '');
          setAvatar(data.avatar_url || '');
        }
      }
    } catch (error) {
      setMessage({ text: 'Error loading profile: ' + error.message, type: 'error' });
    }
  };

  const updateProfile = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    setMessage({ text: '', type: 'info' });

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const updates = { 
          id: user.id, 
          username, 
          updated_at: new Date().toISOString() 
        };
        
        const { error: profileError } = await supabase
          .from(PROFILE_TABLE)
          .upsert(updates);

        if (profileError) throw profileError;

        if (password) {
          if (password !== confirmPassword) {
            throw new Error('Passwords do not match');
          }

          const { error: passwordError } = await supabase.auth.updateUser({
            password: password,
          });

          if (passwordError) throw passwordError;
        }

        setMessage({ text: 'Profile updated successfully!', type: 'success' });
        // Reset password fields after successful update
        setPassword('');
        setConfirmPassword('');
      }
    } catch (error) {
      setMessage({ text: error.message, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarUpload = async (event) => {
    try {
      setLoading(true);
      const file = event.target.files[0];
      
      // Validate file
      if (!file) {
        throw new Error('Please select a file to upload');
      }

      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!allowedTypes.includes(file.type)) {
        throw new Error('File type not supported. Please upload a JPEG, PNG or GIF');
      }

      // Validate file size (max 5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB in bytes
      if (file.size > maxSize) {
        throw new Error('File size too large. Maximum size is 5MB');
      }

      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from(STORAGE_BUCKET)
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { user } } = await supabase.auth.getUser();
      
      // Delete old avatar if exists
      if (avatar) {
        await supabase.storage
          .from(STORAGE_BUCKET)
          .remove([avatar]);
      }

      const updates = {
        id: user.id,
        avatar_url: filePath,
        updated_at: new Date().toISOString(),
      };

      const { error: updateError } = await supabase
        .from(PROFILE_TABLE)
        .upsert(updates);

      if (updateError) throw updateError;

      setAvatar(filePath);
      setMessage({ text: 'Avatar updated successfully!', type: 'success' });
    } catch (error) {
      setMessage({ text: error.message, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (activeStep === 0) {
      // Avatar step is optional, so we don't need to validate
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else if (activeStep === 1) {
      if (!username) {
        setMessage({ text: 'Please provide a username', type: 'warning' });
        return;
      }
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else if (activeStep === 2) {
      if (password || confirmPassword) {
        if (password !== confirmPassword) {
          setMessage({ text: 'Passwords do not match', type: 'error' });
          return;
        }
        if (password.length < 6) {
          setMessage({ text: 'Password must be at least 6 characters long', type: 'error' });
          return;
        }
      }
      updateProfile();
    }
    setMessage({ text: '', type: 'info' }); // Clear messages between steps
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setMessage({ text: '', type: 'info' }); // Clear messages between steps
  };

  const getAvatarUrl = () => {
    if (!avatar) return '';
    return `${process.env.REACT_APP_SUPABASE_URL}/storage/v1/object/public/${STORAGE_BUCKET}/${avatar}`;
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 800, margin: '0 auto', padding: 3 }}>
      <Typography variant="h4" gutterBottom color="primary">
        Profile Settings
      </Typography>

      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((step, index) => (
          <Step key={index}>
            <StepLabel>{step.label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Card sx={{ marginTop: 4, padding: 2 }}>
        <CardHeader
          avatar={
            <Avatar 
              src={getAvatarUrl()} 
              sx={{ width: 64, height: 64 }}
              alt={username || 'Profile Picture'}
            />
          }
          action={
            <IconButton component="label" disabled={loading}>
              <CameraAlt />
              <input
                type="file"
                accept="image/jpeg,image/png,image/gif"
                onChange={handleAvatarUpload}
                style={{ display: 'none' }}
              />
            </IconButton>
          }
          title="Profile Picture"
          subheader="Change your avatar"
        />
        <Divider />
        <CardContent>
          {activeStep === 0 && (
            <Typography variant="body1" color="textSecondary">
              {steps[activeStep].content}
              <br />
              <small>Supported formats: JPEG, PNG, GIF (max 5MB)</small>
            </Typography>
          )}
        </CardContent>
      </Card>

      <Box sx={{ marginTop: 4 }}>
        {activeStep === 1 && (
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{ marginBottom: 3 }}
            disabled={loading}
          />
        )}

        {activeStep === 2 && (
          <>
            <TextField
              label="New Password"
              type="password"
              variant="outlined"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ marginBottom: 2 }}
              disabled={loading}
              helperText="Leave blank to keep current password"
            />
            <TextField
              label="Confirm New Password"
              type="password"
              variant="outlined"
              fullWidth
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              sx={{ marginBottom: 3 }}
              disabled={loading}
            />
          </>
        )}

        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 3 }}>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleBack}
            disabled={loading || activeStep === 0}
            startIcon={<ArrowBack />}
          >
            Back
          </Button>

          <Button
            variant="contained"
            color="primary"
            onClick={handleNext}
            disabled={loading}
            endIcon={activeStep === steps.length - 1 ? <Save /> : null}
          >
            {activeStep === steps.length - 1 ? 'Save Changes' : 'Next'}
          </Button>
        </Box>

        {loading && (
          <Box display="flex" justifyContent="center" mt={3}>
            <CircularProgress />
          </Box>
        )}

        {message.text && (
          <Alert severity={message.type} sx={{ marginTop: 2 }}>
            {message.text}
          </Alert>
        )}
      </Box>
    </Box>
  );
};

export default Settings;
