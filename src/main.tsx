import { lazy, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// All Css in central zone 
import './index.css'
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
// import "ag-grid-community/styles/ag-theme-quartz-dark.css";
// import "ag-grid-community/styles/ag-theme-quartz-auto-dark.css";

import "ag-grid-community/styles/ag-theme-balham.css";
// import "ag-grid-community/styles/ag-theme-balham-dark.css";
// import "ag-grid-community/styles/ag-theme-balham-auto-dark.css";

import "ag-grid-community/styles/ag-theme-material.css";
// import "ag-grid-community/styles/ag-theme-material-dark.css";
// import "ag-grid-community/styles/ag-theme-material-auto-dark.css";


import "ag-grid-community/styles/ag-theme-alpine.css";
// import "ag-grid-community/styles/ag-theme-alpine-dark.css";
// import "ag-grid-community/styles/ag-theme-alpine-auto-dark.css";

// import "./../node_modules/react-grid-layout/css/styles.css"
// import "./../node_modules/react-resizable/css/styles.css"
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import '@szhsin/react-menu/dist/index.css'

// Lazy component 
import SuspenseWrapper from './component/Common/SuspenseWrapper.tsx';
import ProtectedRoute from './routes/ProtectedRoute.tsx';
const App = lazy(() => import('./App.tsx'))
import Login from './pages/login/Login.tsx';

import { Provider } from 'react-redux';
import store, { persistor } from './app/store.ts';
import { MarketProvider } from './context/MarketContext.tsx';
import { PersistGate } from 'redux-persist/integration/react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute>
      <SuspenseWrapper>
        <App />
      </SuspenseWrapper>
    </ProtectedRoute>,
  },
  {
    path: "/login",
    element: <Login />
  },
], {
  future: {
    v7_relativeSplatPath: true,
    v7_fetcherPersist: true,
    v7_normalizeFormMethod: true,
    v7_partialHydration: true,
    v7_skipActionErrorRevalidation: true,
  },
});

// persistor.purge();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MarketProvider>
          <RouterProvider router={router} future={{ v7_startTransition: true }} />
        </MarketProvider>
      </PersistGate>
    </Provider>
  </StrictMode>,
)
