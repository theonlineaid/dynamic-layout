import { Box, LinearProgress } from '@mui/material';
import React, { Suspense, ReactNode } from 'react';

interface SuspenseWrapperProps {
  children: ReactNode;
  fallback?: ReactNode;
}

const loading = (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100vh', // full screen height
      position: 'absolute', // absolute positioning to cover full screen
      top: 0,
      left: 0,
    }}
  >
    <Box sx={{ width: '20%' }}>
      <LinearProgress />
    </Box>
  </Box>
);

const SuspenseWrapper: React.FC<SuspenseWrapperProps> = ({ children, fallback = loading }) => {
  return <Suspense fallback={fallback}>{children}</Suspense>;
};

export default SuspenseWrapper;
