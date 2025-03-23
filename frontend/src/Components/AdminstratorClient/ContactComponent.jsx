import React, { useState } from 'react';
import { TextField, Button, Typography, Container } from '@mui/material';

const ContactComponent = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your submit logic here
    alert('Message sent!');
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Contact Us</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Your Email"
          variant="outlined"
          fullWidth
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Your Message"
          variant="outlined"
          fullWidth
          required
          multiline
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>Submit</Button>
      </form>
    </Container>
  );
};

export default ContactComponent;
