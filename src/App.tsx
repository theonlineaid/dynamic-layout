import './App.css';
// import { lazy } from 'react';
// import { CircularProgress } from '@mui/material';
import MasterLayout from './layout/MasterLayout';
// import SuspenseWrapper from './component/Common/SuspenseWrapper';
// const MarqueeControl = lazy(() => import('./component/Marquee/MarqueeControl'))

function App() {
  return (
    <>
      {/* <SuspenseWrapper fallback={<CircularProgress />}>
        <MarqueeControl />
      </SuspenseWrapper> */}
      <MasterLayout />
    </>
  );
}

export default App;
