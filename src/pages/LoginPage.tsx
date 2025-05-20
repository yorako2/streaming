import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      const success = await login(username, password);
      
      if (success) {
        navigate('/');
      } else {
        setError('Usuario o contraseña inválidos');
      }
    } catch (err) {
      setError('Ocurrió un error durante el inicio de sesión');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-blue-900 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
          <div className="px-8 pt-8 pb-6 text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">
              Gestión de Streaming
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Inicia sesión para acceder a tu sistema de gestión de cuentas
            </p>
          </div>
          
          <div className="px-8 pb-8">
            {error && (
              <div className="mb-4 bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 px-4 py-3 rounded relative">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label="Usuario"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Ingresa tu usuario"
                fullWidth
                required
                leftIcon={<User size={18} />}
              />
              
              <Input
                label="Contraseña"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingresa tu contraseña"
                fullWidth
                required
                leftIcon={<Lock size={18} />}
              />
              
              <div>
                <Button
                  type="submit"
                  fullWidth
                  size="lg"
                  isLoading={isLoading}
                >
                  Iniciar Sesión
                </Button>
              </div>
            </form>
            
            <div className="mt-6">
              <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                <p>Credenciales por defecto:</p>
                <p className="mt-1">Usuario: demo | Contraseña: demo</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;