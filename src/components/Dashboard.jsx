import React, { useEffect, useState } from 'react';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { Box, Avatar, Typography, Paper, Menu, MenuItem } from '@mui/material';
import { signOut } from 'firebase/auth';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleOpenSpecialMap = () => {
    handleClose();
    navigate('/special-map');
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  if (!user) return null;

  const chennaiPosition = [13.0827, 80.2707]; // Chennai coordinates

  return (
    <Box sx={{ height: '100vh', width: '100vw', position: 'relative' }}>
      <Box sx={{ 
        position: 'absolute',
        top: 16,
        right: 16,
        zIndex: 1000,
        p: 2, 
        display: 'flex', 
        alignItems: 'center',
        gap: 2,
        bgcolor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 2,
        boxShadow: 2,
        cursor: 'pointer'
      }}
      onClick={handleProfileClick}>
        <Typography variant="subtitle1" sx={{ color: 'black' }}>
          {user.displayName || user.email}
        </Typography>
        <Avatar
          src={user.photoURL}
          alt={user.displayName || user.email}
        />
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={handleOpenSpecialMap}>Open Special Map</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
      
      <Box sx={{ height: '100%', width: '100%' }}>
        <MapContainer
          center={chennaiPosition}
          zoom={12}
          style={{ height: '100%', width: '100%', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={chennaiPosition} />
        </MapContainer>
      </Box>
    </Box>
  );
};

export default Dashboard;