import './App.css';
import { LoadingProvider } from './contexts/LoadingScreen';
import Router from './routes';

function App() {
  return (
    <>
      <LoadingProvider>
        <Router />
      </LoadingProvider>
    </>
  )
}

export default App