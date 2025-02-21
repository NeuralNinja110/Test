import React, { useEffect, useState } from 'react';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { Box, Avatar, Typography, Paper, Menu, MenuItem, Button } from '@mui/material';
import { signOut } from 'firebase/auth';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import LocationOnIcon from '@mui/icons-material/LocationOn';

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
  const [coordinates, setCoordinates] = useState(null);
  const [locationError, setLocationError] = useState('');

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
    window.open('https://incois.gov.in/geoportal/MFASPFZ/index.html', '_blank');
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        navigate('/login');
      }
    });

    // Get user's location
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          setCoordinates({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setLocationError('');
        },
        (error) => {
          setLocationError('Unable to retrieve your location');
          console.error('Error getting location:', error);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        }
      );

      return () => {
        unsubscribe();
        navigator.geolocation.clearWatch(watchId);
      };
    } else {
      setLocationError('Geolocation is not supported by your browser');
    }
  }, [navigate]);

  if (!user) return null;

  const chennaiPosition = [13.0827, 80.2707]; // Chennai coordinates

  return (
    <Box sx={{ height: '100vh', width: '100vw', position: 'relative' }}>
      <Box
        sx={{
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
        onClick={handleProfileClick}
      >
        <Typography variant="subtitle1" sx={{ color: 'black' }}>
          {user.displayName || user.email}
        </Typography>
        <Avatar
          src={user.photoURL}
          alt={user.displayName || user.email}
        />
      </Box>

      <Box
        sx={{
          position: 'absolute',
          top: 16,
          left: 16,
          zIndex: 1000,
        }}
      >
        <Button
          variant="contained"
          onClick={handleOpenSpecialMap}
          sx={{
            bgcolor: 'rgba(25, 118, 210, 0.9)',
            '&:hover': {
              bgcolor: 'rgba(25, 118, 210, 0.7)'
            }
          }}
        >
          Access Marine Map
        </Button>
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

      {coordinates && (
        <Box
          sx={{
            position: 'absolute',
            bottom: 16,
            right: 16,
            zIndex: 1000,
            p: 2,
            bgcolor: 'rgba(255, 255, 255, 0.9)',
            borderRadius: 2,
            boxShadow: 2,
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}
        >
          <LocationOnIcon sx={{ color: 'black' }} />
          <Typography variant="body2" sx={{ color: 'black' }}>
            Lat: {coordinates.lat.toFixed(6)}, Lng: {coordinates.lng.toFixed(6)}
          </Typography>
        </Box>
      )}
      
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