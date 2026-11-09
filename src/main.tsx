import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './components/App/App.tsx'
import "modern-normalize/modern-normalize.css"
import {QueryClientProvider, QueryClient} from '@tanstack/react-query';

if (document.getElementById('root') !== null) {
  const queryClient = new QueryClient();

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </StrictMode>
);
}