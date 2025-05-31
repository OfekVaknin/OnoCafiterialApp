import { BrowserRouter as Router } from 'react-router-dom';
import { useEffect } from 'react';
import AppRouter from './AppRouter';
import { authService } from './features/auth/services/authService';

function App() {
  useEffect(() => {
    authService.ensureAdminUser();
  }, []);

  return (
    <Router>
      <AppRouter />
    </Router>
  );
}

export default App;
