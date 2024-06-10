import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import router from './Routers/Router.jsx';
import AuthProviders from './Provider/AuthProvider.jsx';
import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProviders>
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <RouterProvider router={router} />
        </HelmetProvider>
        <Toaster />
      </QueryClientProvider>
    </AuthProviders>
  </React.StrictMode>
);
