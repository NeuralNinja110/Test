import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, IconButton, CircularProgress, Typography, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const SpecialMap = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleIframeLoad = () => {
    setLoading(false);
  };

  const handleIframeError = () => {
    setLoading(false);
    setError(true);
  };

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

      {loading && (
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 1000,
            textAlign: 'center'
          }}
        >
          <CircularProgress />
          <Typography sx={{ mt: 2 }}>Loading map...</Typography>
        </Box>
      )}

      {error ? (
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center'
          }}
        >
          <Typography variant="h6" color="error" gutterBottom>
            Unable to load the map
          </Typography>
          <Button
            variant="contained"
            onClick={() => window.open('https://incois.gov.in/geoportal/OON/index.html', '_blank')}
          >
            Open in New Tab
          </Button>
        </Box>
      ) : (
        <iframe
          src="https://incois.gov.in/geoportal/OON/index.html"
          style={{
            width: '100%',
            height: '100%',
            border: 'none'
          }}
          title="INCOIS Geoportal"
          onLoad={handleIframeLoad}
          onError={handleIframeError}
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
          referrerPolicy="no-referrer"
        />
      )}
    </Box>
  );
};

export default SpecialMap;