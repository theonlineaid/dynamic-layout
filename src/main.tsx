import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css";

import "./../node_modules/react-grid-layout/css/styles.css"
import "./../node_modules/react-resizable/css/styles.css"

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import store, { persistor } from './app/store.ts';
import { Provider } from 'react-redux';
import ProtectedRoute from './routes/ProtectedRoute.tsx';
import Login from './pages/login/Login.tsx';
import { PersistGate } from 'redux-persist/integration/react';
import { MarketProvider } from './context/MarketContext.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute> <App /> </ProtectedRoute>,
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

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MarketProvider>
          <RouterProvider router={router} future={{ v7_startTransition: true}} />
        </MarketProvider>
      </PersistGate>
    </Provider>
  </StrictMode>,
)
