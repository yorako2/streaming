import React from 'react';
import Card from '../components/ui/Card';
import Table from '../components/ui/Table';
import { useData } from '../contexts/DataContext';
import { Recharge } from '../types';

const RechargesPage = () => {
  const { recharges } = useData();

  const columns = [
    { 
      key: 'customerName', 
      header: 'Customer'
    },
    { 
      key: 'providerName', 
      header: 'Provider'
    },
    { 
      key: 'price', 
      header: 'Price',
      render: (recharge: Recharge) => `$${recharge.price.toFixed(2)}`
    },
    { 
      key: 'paymentDate', 
      header: 'Date',
      render: (recharge: Recharge) => new Date(recharge.paymentDate).toLocaleDateString()
    },
    { 
      key: 'details', 
      header: 'Details'
    }
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Recharges</h1>
      
      <Card>
        <Table
          data={recharges}
          columns={columns}
          keyField="id"
          emptyMessage="No recharges found"
        />
      </Card>
    </div>
  );
};

export default RechargesPage;