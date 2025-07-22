import { Toaster } from 'sonner';
import './App.css';
import Router from './routes';
import { LoadingProvider } from './contexts/LoadingScreen';

function App() {
  return (
    <>
      <LoadingProvider>
        <Router />
      </LoadingProvider>
      <Toaster richColors={true} position="top-center" closeButton />
    </>
  )
}

export default App