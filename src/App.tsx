import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Welcome from './pages/Welcome';
import Auth from './pages/Auth';
import Home from './pages/Home';
import Membership from './pages/Membership';
import Marketplace from './pages/Marketplace';
import Explore from './pages/Explore';
import My from './pages/My';
import Layout from './components/Layout';
import OfflineDetector from './components/OfflineDetector';

function App() {
  return (
    <OfflineDetector>
      <Router>
        <Routes>
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/auth" element={<Auth />} />
          
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/home" replace />} />
            <Route path="home" element={<Home />} />
            <Route path="membership" element={<Membership />} />
            <Route path="explore" element={<Explore />} />
            <Route path="marketplace" element={<Marketplace />} />
            <Route path="my" element={<My />} />
          </Route>
        </Routes>
      </Router>
    </OfflineDetector>
  );
}

export default App;