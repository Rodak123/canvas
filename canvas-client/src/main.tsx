import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App.tsx'
import { ApiContextProvider } from './services/ApiProvider.tsx'
import 'bootstrap/dist/css/bootstrap.min.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApiContextProvider>
      <App />
    </ApiContextProvider>
  </StrictMode>,
)
