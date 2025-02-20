import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const SpecialMap = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ height: '100vh', width: '100vw', position: 'relative' }}>
      <IconButton
        onClick={() => navigate('/dashboard')}
        sx={{
          position: 'absolute',
          top: 16,
          right: 16,
          zIndex: 1000,
          bgcolor: 'rgba(255, 255, 255, 0.9)',
          '&:hover': {
            bgcolor: 'rgba(255, 255, 255, 0.7)'
          }
        }}
      >
        <ArrowBackIcon />
      </IconButton>
      <iframe
        src="https://incois.gov.in/geoportal/OON/index.html"
        style={{
          width: '100%',
          height: '100%',
          border: 'none'
        }}
        title="INCOIS Geoportal"
      />
    </Box>
  );
};

export default SpecialMap;