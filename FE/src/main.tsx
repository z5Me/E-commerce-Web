import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './store/store.ts'
import { Toaster } from 'sonner'
import { AppProvider } from './contexts/ContextData.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Provider store={store}>
      <AppProvider>
        <App />
        <Toaster richColors={true} position="top-center" closeButton />
      </AppProvider>
    </Provider>
  </BrowserRouter>
)
