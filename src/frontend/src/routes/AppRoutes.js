import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react'; // Importa o ChakraProvider
import Home from '../pages/Home';
import Account from '../pages/Account';
import MercadoPago from '../pages/MercadoPago';
import FinancialStatement from '../pages/FinancialStatement';
import UserManagement from '../pages/UserManagement';
import GroupManagement from '../pages/GroupManagement';
import Dashboard from '../components/Dashboard';
import Login from '../components/Login';
import Navbar from '../components/Navbar';

function PrivateRoute({ children, allowedRoles }) {
  const isAuth = localStorage.getItem('authToken');
  const role = localStorage.getItem('userRole');
  
  return isAuth && allowedRoles.includes(role) ? children : <Navigate to="/login" />;
}

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={
          <ChakraProvider> {/* ChakraProvider é aplicado aqui, envolvendo todas as rotas exceto Login */}
            <Navbar />
            <Routes>
            <Route path="/" element={<PrivateRoute allowedRoles={['ADMIN', 'CEO', 'CHO', 'CMO', 'CTO', 'GAME SHARK', 'Gerente de Projeto', 'Gerente de Vendas 1', 'Gerente de Vendas 2', 'Representante']}><Home /></PrivateRoute>} />
            <Route path="/home" element={<PrivateRoute allowedRoles={['ADMIN', 'CEO', 'CHO', 'CMO', 'CTO', 'GAME SHARK', 'Gerente de Projeto', 'Gerente de Vendas 1', 'Gerente de Vendas 2', 'Representante']}><Home /></PrivateRoute>} />
              <Route path="/account" element={<PrivateRoute allowedRoles={['ADMIN', 'CEO', 'CHO', 'CMO', 'CTO', 'GAME SHARK', 'Gerente de Projeto', 'Gerente de Vendas 1', 'Gerente de Vendas 2', 'Representante']}><Account /></PrivateRoute>} />
              <Route path="/mercado-pago" element={<PrivateRoute allowedRoles={['ADMIN', 'CEO', 'CHO', 'CMO', 'CTO', 'GAME SHARK', 'Gerente de Projeto', 'Gerente de Vendas 1', 'Gerente de Vendas 2', 'Representante']}><MercadoPago /></PrivateRoute>} />
              <Route path="/financial-statement" element={<PrivateRoute allowedRoles={['ADMIN', 'CEO', 'CHO', 'CMO', 'CTO', 'GAME SHARK', 'Gerente de Projeto', 'Gerente de Vendas 1', 'Gerente de Vendas 2', 'Representante']}><FinancialStatement /></PrivateRoute>} />
              <Route path="/user-management" element={<PrivateRoute allowedRoles={['ADMIN']}><UserManagement /></PrivateRoute>} />
              <Route path="/group-management" element={<PrivateRoute allowedRoles={['ADMIN']}><GroupManagement /></PrivateRoute>} />
              <Route path="/dashboard" element={<PrivateRoute allowedRoles={['ADMIN']}><Dashboard /></PrivateRoute>} />
            </Routes>
          </ChakraProvider>
        } />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
