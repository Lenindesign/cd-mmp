import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import VehiclePage from './pages/VehiclePage';
import VehiclesListPage from './pages/VehiclesListPage';
import './App.css';

function App() {
  const handleShopNewCars = () => {
    window.location.href = '/vehicles';
  };

  return (
    <div className="app">
      <Header onShopNewCars={handleShopNewCars} />
      
      <Routes>
        {/* Home Page - 2025 Chevrolet Trax */}
        <Route path="/" element={<HomePage />} />
        
        {/* Browse All Vehicles */}
        <Route path="/vehicles" element={<VehiclesListPage />} />
        
        {/* Individual Vehicle Pages - Dynamic routes based on slug */}
        <Route path="/:year/:make/:model" element={<VehiclePage />} />
      </Routes>
      
      <Footer />
      </div>
  );
}

export default App;
