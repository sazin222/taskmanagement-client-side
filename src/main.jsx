import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './routes/Router.jsx'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import { HelmetProvider } from 'react-helmet-async'
import AuthProvider from './providers/AuthProvider.jsx'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <div className='w-full h-full mx-auto bg-[#f8f8f8]'>
      <React.StrictMode>
        <AuthProvider>
          <Toaster />
          <HelmetProvider>
            <RouterProvider router={router} />
          </HelmetProvider>
        </AuthProvider>
      </React.StrictMode>
    </div>
  </QueryClientProvider>
)