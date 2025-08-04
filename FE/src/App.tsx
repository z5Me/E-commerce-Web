import './App.css';
import { DialogProvider } from './contexts/DialogContext';
import { LoadingProvider } from './contexts/LoadingScreen';
import Router from './routes';

function App() {
  return (
    <>
      <DialogProvider>
        <LoadingProvider>
          <Router />
        </LoadingProvider>
      </DialogProvider>
    </>
  )
}

export default App