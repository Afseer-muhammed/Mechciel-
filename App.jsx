import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Pages
import Home from './pages/Home/Home';
import DriverDashboard from './pages/Profile/DriverDashboard';
import Login from './pages/Auth/Login';
import RideTracking from './pages/RideTracking/RideTracking';
import RideSummary from './pages/History/RideSummary';

// UI Components
import InstallBanner from './components/ui/InstallBanner';

function App() {
  const { user, userRole, loading } = useAuth();

  if (loading) return <div className="loading-screen">SHMAKZ RIDE...</div>;

  return (
    <Router>
      <InstallBanner />
      <Routes>
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
        
        {/* Protected Core Loop */}
        <Route path="/" element={
          user ? (userRole === 'driver' ? <DriverDashboard /> : <Home />) : <Navigate to="/login" />
        } />
        
        <Route path="/tracking" element={user ? <RideTracking /> : <Navigate to="/login" />} />
        <Route path="/summary" element={user ? <RideSummary /> : <Navigate to="/login" />} />
        
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
