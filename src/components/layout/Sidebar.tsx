import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  Users, 
  ShoppingCart, 
  CreditCard, 
  Package, 
  BarChart2,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface SidebarProps {
  isMobileOpen: boolean;
  toggleMobileSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isMobileOpen, toggleMobileSidebar }) => {
  const { logout } = useAuth();

  const navItems = [
    { name: 'Inicio', path: '/', icon: <Home size={20} /> },
    { name: 'Clientes', path: '/customers', icon: <Users size={20} /> },
    { name: 'Cuentas', path: '/accounts', icon: <Package size={20} /> },
    { name: 'Ventas', path: '/sales', icon: <ShoppingCart size={20} /> },
    { name: 'Pagos', path: '/payments', icon: <CreditCard size={20} /> },
    { name: 'Recargas', path: '/recharges', icon: <BarChart2 size={20} /> },
  ];

  return (
    <>
      {/* Mobile sidebar overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden" 
          onClick={toggleMobileSidebar}
        />
      )}

      {/* Mobile sidebar toggle button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-blue-600 text-white"
        onClick={toggleMobileSidebar}
      >
        {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside 
        className={`
          fixed top-0 left-0 z-40 h-full w-64 
          bg-gray-900 text-gray-100
          transform transition-transform duration-300 ease-in-out 
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          lg:relative lg:z-0
        `}
      >
        <div className="flex flex-col h-full">
          <div className="p-5 border-b border-gray-800">
            <h1 className="text-2xl font-bold text-white">Gestión de Streaming</h1>
            <p className="text-sm text-gray-400 mt-1">Sistema de Gestión de Cuentas</p>
          </div>

          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `
                  flex items-center px-4 py-3 rounded-md text-sm font-medium
                  transition-colors duration-200
                  ${isActive 
                    ? 'bg-blue-700 text-white' 
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'}
                `}
                onClick={() => isMobileOpen && toggleMobileSidebar()}
                end={item.path === '/'}
              >
                <span className="mr-3">{item.icon}</span>
                {item.name}
              </NavLink>
            ))}
          </nav>

          <div className="p-4 border-t border-gray-800">
            <button
              onClick={logout}
              className="flex items-center w-full px-4 py-3 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-800 hover:text-white transition-colors duration-200"
            >
              <LogOut size={20} className="mr-3" />
              Cerrar Sesión
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;