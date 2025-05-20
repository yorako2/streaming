import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import Layout from './components/layout/Layout';
import DashboardPage from './pages/DashboardPage';
import CustomersPage from './pages/CustomersPage';
import AccountsPage from './pages/AccountsPage';
import SalesPage from './pages/SalesPage';
import PaymentsPage from './pages/PaymentsPage';
import RechargesPage from './pages/RechargesPage';

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <DataProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            
            <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/customers" element={<CustomersPage />} />
              <Route path="/accounts" element={<AccountsPage />} />
              <Route path="/sales" element={<SalesPage />} />
              <Route path="/payments" element={<PaymentsPage />} />
              <Route path="/recharges" element={<RechargesPage />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </DataProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;