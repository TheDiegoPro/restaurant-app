import { Button, Card, Flex } from 'antd';
import React from 'react';
import { useAuth } from '../contexts/AuthContext.jsx';
import { Navigate } from 'react-router-dom';
import RestaurantSearch from './Restaurantsearch.jsx';

const Dashboard = () => {
  const { userData, logout, isAuthenticated } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  // Si el usuario no está autenticado, redirige a la página de login
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Si userData es null, no renderices el contenido
  if (!userData) {
    return null; // O puedes mostrar un mensaje de carga o un spinner
  }

  return (
    <div className="container">
      <Card className="profile-card">
        <Flex vertical gap="small" align="center">
          <RestaurantSearch />
          <Button size="large" type="primary" className="profile-btn" onClick={handleLogout}>
            Salir
          </Button>
        </Flex>
      </Card>
    </div>
  );
};

export default Dashboard;
