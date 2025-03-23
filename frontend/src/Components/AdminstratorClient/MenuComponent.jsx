import React from 'react';
import { Card, CardContent, CardMedia, Typography} from '@mui/material';

const MenuComponent = () => {
  const menuItems = [
    {
      name: 'JOZI',
      description: 'Delicious flame-grilled chicken in a soft kota bread.',
      price: 'R50',
      imageUrl: 'https://tb-static.uber.com/prod/image-proc/processed_images/24fc780275e5be8892280739f5fdd70a/f0d1762b91fd823a1aa9bd0dab5c648d.jpeg',
    },
    {
      name: 'BEE',
      description: 'Juicy flame-grilled beef, topped with spicy sauce.',
      price: 'R55',
      imageUrl: 'https://tb-static.uber.com/prod/image-proc/processed_images/a175223c84ce9e9464b879d9ecc28014/7f4ae9ca0446cbc23e71d8d395a98428.jpeg',
    },
    {
      name: 'MAMAZALA',
      description: 'A tasty and healthy mix of veggies in soft kota bread.',
      price: 'R40',
      imageUrl: 'https://tb-static.uber.com/prod/image-proc/processed_images/407a0815eb03fd396e73e756040a59f3/58f691da9eaef86b0b51f9b2c483fe63.jpeg',
    },
    // Add more items hereF
  ];

  return (
    <div style={{ padding: '20px' }}>
      <div
        style={{
          display: 'flex',
          overflowX: 'auto',
          paddingBottom: '20px',
          gap: '20px',
        }}
      >
        {menuItems.map((item, index) => (
          <div key={index} style={{ flexShrink: 0 }}>
            <Card>
              <CardMedia
                component="img"
                height="160"
                image={item.imageUrl}
                alt={item.name}
              />
              <CardContent>
                <Typography variant="h6">{item.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {item.description}
                </Typography>
                {/* <Typography variant="h6" color="primary" style={{ marginTop: '10px' }}>
                  {item.price}
                </Typography> */}
                {/* <Button variant="contained" color="primary" fullWidth style={{ marginTop: '10px' }}>
                  Order Now
                </Button> */}
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuComponent;
