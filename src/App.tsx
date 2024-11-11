
import { lazy } from 'react';
import { CircularProgress } from '@mui/material';
import MasterLayout from './layout/MasterLayout';
import SuspenseWrapper from './component/Common/SuspenseWrapper';
const MarqueeControl = lazy(() => import('./component/Marquee/MarqueeControl'))
// import { useColorScheme } from '@mui/material/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  cssVariables: true,
  colorSchemes: { dark: true },
});

function App() {
  // const { mode, setMode } = useColorScheme();
  // if (!mode) return null;
  return (
    <>
      <ThemeProvider theme={theme}>
        <SuspenseWrapper fallback={<CircularProgress />}>
        <MarqueeControl />
      </SuspenseWrapper> 
        {/* <select onChange={(event:any) => setMode(event.target.value)}>
        <option value="system">System</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select> */}
        <MasterLayout />
      </ThemeProvider>
    </>
  );
}

export default App;
