
import { lazy } from 'react';
import { CircularProgress } from '@mui/material';
import MasterLayout from './layout/MasterLayout';
import SuspenseWrapper from './component/Common/SuspenseWrapper';
const MarqueeControl = lazy(() => import('./component/Marquee/MarqueeControl'))
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  cssVariables: true,
  colorSchemes: { dark: true },
});

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <SuspenseWrapper fallback={<CircularProgress />}>
        <MarqueeControl />
      </SuspenseWrapper> 
        <MasterLayout />
      </ThemeProvider>
    </>
  );
}

export default App;
