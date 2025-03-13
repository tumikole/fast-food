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
} from '@mui/material';
import { CameraAlt, Save, ArrowBack } from '@mui/icons-material';
import './Settings.scss';

const Settings = () => {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [activeStep, setActiveStep] = useState(0);

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
          .from('profilepictures')
          .select('username, avatar_url')
          .eq('id', user.id)
          .single();

        if (error) {
          console.error("error", error)
        }

        if (data) {
          setUsername(data.username || '');
          setAvatar(data.avatar_url || '');
        }
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    }
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const updates = { id: user.id, username, updated_at: new Date() };
        const { error: profileError } = await supabase
          .from('profilepictures')
          .upsert(updates);

        if (profileError) throw profileError;

        if (password) {
          if (password !== confirmPassword) {
            setMessage('Passwords do not match');
            return;
          }

          const { error: passwordError } = await supabase.auth.updateUser({
            password: password,
          });

          if (passwordError) throw passwordError;
        }

        setMessage('Profile updated successfully!');
      }
    } catch (error) {
      setMessage('Error updating profile: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarUpload = async (event) => {
    try {
      setLoading(true);
      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('profilepictures')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { user } } = await supabase.auth.getUser();
      const updates = {
        id: user.id,
        avatar_url: filePath,
        updated_at: new Date(),
      };

      const { error: updateError } = await supabase
        .from('profilepictures')
        .upsert(updates);

      if (updateError) throw updateError;

      setAvatar(filePath);
      setMessage('Avatar updated successfully!');
    } catch (error) {
      setMessage('Error uploading avatar: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (activeStep === 0) {
      if (!avatar) {
        setMessage('Please upload your avatar');
        return;
      }
    } else if (activeStep === 1) {
      if (!username) {
        setMessage('Please provide a username');
        return;
      }
    } else if (activeStep === 2) {
      if (!password || !confirmPassword) {
        setMessage('Please fill in both password fields');
        return;
      }
      if (password !== confirmPassword) {
        setMessage('Passwords do not match');
        return;
      }
    }

    if (activeStep === steps.length - 1) {
      updateProfile();
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 800, margin: '0 auto' }}>
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
          avatar={<Avatar src={avatar ? `${process.env.REACT_APP_SUPABASE_URL}/storage/v1/object/public/avatars/${avatar}` : ''} />}
          action={
            <IconButton component="label">
              <CameraAlt />
              <input
                type="file"
                accept="image/*"
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
          {activeStep === 0 && <Typography variant="body1">{steps[activeStep].content}</Typography>}
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
            />
            <TextField
              label="Confirm New Password"
              type="password"
              variant="outlined"
              fullWidth
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              sx={{ marginBottom: 3 }}
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

        {loading && <CircularProgress sx={{ display: 'block', marginTop: 3 }} />}

        {message && (
          <Typography variant="body1" color="error" sx={{ marginTop: 2 }}>
            {message}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default Settings;
