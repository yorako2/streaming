import React, { useState } from 'react';
import { useData } from '../contexts/DataContext';
import Card from '../components/ui/Card';
import { TrendingUp, TrendingDown, DollarSign, BarChart2, Users, CreditCard, Server, UserCheck, AlertTriangle } from 'lucide-react';
import { format, subDays } from 'date-fns';
import { Chart } from '../components/ui/Chart'; // Asumiendo que existe un componente Chart

const DashboardPage: React.FC = () => {
  const [startDate, setStartDate] = useState<Date>(subDays(new Date(), 30));
  const [endDate, setEndDate] = useState<Date>(new Date());
  
  const { getFinancialSummary } = useData();
  const summary = getFinancialSummary(startDate, endDate);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Panel de Control</h1>
        
        <div className="flex gap-4">
          <input
            type="date"
            value={format(startDate, 'yyyy-MM-dd')}
            onChange={(e) => setStartDate(new Date(e.target.value))}
            className="px-3 py-2 border border-gray-300 rounded-md"
          />
          <input
            type="date"
            value={format(endDate, 'yyyy-MM-dd')}
            onChange={(e) => setEndDate(new Date(e.target.value))}
            className="px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-80">Ingresos Totales</p>
              <p className="text-2xl font-bold">${summary.income.toFixed(2)}</p>
            </div>
            <DollarSign size={24} className="opacity-80" />
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-red-500 to-red-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-80">Gastos Totales</p>
              <p className="text-2xl font-bold">${summary.expenses.toFixed(2)}</p>
            </div>
            <TrendingDown size={24} className="opacity-80" />
          </div>
        </Card>

        <Card className={`bg-gradient-to-br ${summary.balance >= 0 ? 'from-green-500 to-green-600' : 'from-red-500 to-red-600'} text-white`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-80">Balance Neto</p>
              <p className="text-2xl font-bold">${summary.balance.toFixed(2)}</p>
            </div>
            <TrendingUp size={24} className="opacity-80" />
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-80">Cuentas Activas</p>
              <p className="text-2xl font-bold">{summary.activeAccounts}</p>
            </div>
            <Server size={24} className="opacity-80" />
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-80">Clientes Totales</p>
              <p className="text-2xl font-bold">{summary.totalCustomers}</p>
            </div>
            <UserCheck size={24} className="opacity-80" />
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-80">Cuentas por Vencer</p>
              <p className="text-2xl font-bold">{summary.expiringAccounts}</p>
            </div>
            <AlertTriangle size={24} className="opacity-80" />
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="Estadísticas de Clientes">
          <div className="flex items-center gap-4">
            <Users size={32} className="text-blue-500" />
            <p className="text-lg font-bold">{summary.totalCustomers} Clientes</p>
          </div>
        </Card>

        <Card title="Estadísticas de Ventas">
          <div className="flex items-center gap-4">
            <BarChart2 size={32} className="text-green-500" />
            <p className="text-lg font-bold">{summary.totalSales} Ventas</p>
          </div>
        </Card>

        <Card title="Estadísticas de Pagos">
          <div className="flex items-center gap-4">
            <CreditCard size={32} className="text-purple-500" />
            <p className="text-lg font-bold">{summary.totalPayments} Pagos</p>
          </div>
        </Card>
      </div>

      <Card title="Tendencias de Ingresos y Gastos">
        <Chart data={summary.trends} />
      </Card>

      <Card title="Resumen por Plataforma">
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {summary.platformBreakdown.map((platform) => (
            <div key={platform.platform} className="py-4 first:pt-0 last:pb-0">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium text-gray-900 dark:text-white">{platform.platform}</h3>
                <span className={`text-sm font-medium ${platform.balance >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  ${platform.balance.toFixed(2)}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400">
                <div>Ingresos: ${platform.income.toFixed(2)}</div>
                <div>Gastos: ${platform.expenses.toFixed(2)}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default DashboardPage;