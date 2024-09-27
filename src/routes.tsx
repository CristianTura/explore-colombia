import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

// Importar los componentes de las páginas
import Login from 'pages/Login';
import Home from 'pages/Home';
import Departments from 'pages/Departments';
import Cities from 'pages/Cities';
import Presidents from 'pages/Presidents';
import TouristicAttraction from 'pages/TouristicAttraction';
// import Dashboard from 'pages/Dashboard';
// import Page1 from 'pages/dashboard/Page1';
// import Page2 from 'pages/dashboard/Page2';
// import Page3 from 'pages/dashboard/Page3';

// Interfaz para representar la autenticación
interface PrivateRouteProps {
  children: JSX.Element;
}

// Componente para rutas protegidas
const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('accessToken');
  return isAuthenticated ? <>{children}</>  : <Navigate to="/login" />;
};

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/login" element={<Login />} />

        {/* Rutas protegidas */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Home/>
            </PrivateRoute>
          }
        />
        <Route
          path="/departments"
          element={
            <PrivateRoute>
              <Departments/>
            </PrivateRoute>
          }
        />
        <Route
          path="/cities"
          element={
            <PrivateRoute>
              <Cities/>
            </PrivateRoute>
          }
        />
        <Route
          path="/presidents"
          element={
            <PrivateRoute>
              <Presidents/>
            </PrivateRoute>
          }
        />
        <Route
          path="/touristic-attraction"
          element={
            <PrivateRoute>
              <TouristicAttraction/>
            </PrivateRoute>
          }
        />

        {/* Ruta por defecto: redirigir a login si no se encuentra ninguna ruta */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;