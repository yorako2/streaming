import React, { useState } from 'react';
import { useData } from '../contexts/DataContext';
import { Account } from '../types';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Table from '../components/ui/Table';

const AccountsPage: React.FC = () => {
  const { accounts, addAccount, updateAccount, deleteAccount } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAccount, setEditingAccount] = useState<Account | null>(null);
  const [formData, setFormData] = useState<Omit<Account, 'id'>>({
    providerId: '',
    providerName: '',
    providerContact: '',
    platform: 'Netflix',
    email: '',
    password: '',
    profiles: 1,
    cost: 0,
    paymentDate: new Date(),
    daysAvailable: 30,
    nextPaymentDate: new Date(),
    status: 'available',
  });

  const handleInputChange = (name: string, value: string | number | Date) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    if (editingAccount) {
      updateAccount(editingAccount.id, formData);
    } else {
      addAccount(formData);
    }
    setIsModalOpen(false);
    setEditingAccount(null);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      providerId: '',
      providerName: '',
      providerContact: '',
      platform: 'Netflix',
      email: '',
      password: '',
      profiles: 1,
      cost: 0,
      paymentDate: new Date(),
      daysAvailable: 30,
      nextPaymentDate: new Date(),
      status: 'available',
    });
  };

  const handleEdit = (account: Account) => {
    setEditingAccount(account);
    setFormData({
      providerId: account.providerId,
      providerName: account.providerName,
      providerContact: account.providerContact,
      platform: account.platform,
      email: account.email,
      password: account.password,
      profiles: account.profiles,
      cost: account.cost,
      paymentDate: account.paymentDate,
      daysAvailable: account.daysAvailable,
      nextPaymentDate: account.nextPaymentDate,
      status: account.status,
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    deleteAccount(id);
  };

  const columns = [
    { key: 'platform', header: 'Plataforma' },
    { key: 'email', header: 'Email' },
    { key: 'profiles', header: 'Perfiles' },
    { key: 'cost', header: 'Costo', render: (item: Account) => `${item.cost} USD` },
    { key: 'status', header: 'Estado' },
    {
      key: 'actions',
      header: 'Acciones',
      render: (item: Account) => (
        <div className="flex space-x-2">
          <Button onClick={() => handleEdit(item)}>Editar</Button>
          <Button variant="danger" onClick={() => handleDelete(item.id)}>
            Eliminar
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Gestión de Cuentas</h1>
        <Button onClick={() => setIsModalOpen(true)}>Agregar Cuenta</Button>
      </div>
      <Table data={accounts} columns={columns} keyField="id" />
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-xl font-bold mb-4">
          {editingAccount ? 'Editar Cuenta' : 'Agregar Cuenta'}
        </h2>
        <form className="space-y-4">
          <Input
            label="Plataforma"
            name="platform"
            value={formData.platform}
            onChange={(e) => handleInputChange('platform', e.target.value)}
          />
          <Input
            label="Email"
            name="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
          />
          <Input
            label="Contraseña"
            name="password"
            value={formData.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
          />
          <Input
            label="Perfiles"
            name="profiles"
            type="number"
            value={formData.profiles}
            onChange={(e) => handleInputChange('profiles', Number(e.target.value))}
          />
          <Input
            label="Costo"
            name="cost"
            type="number"
            value={formData.cost}
            onChange={(e) => handleInputChange('cost', Number(e.target.value))}
          />
          <Input
            label="Fecha de Pago"
            name="paymentDate"
            type="date"
            value={formData.paymentDate.toISOString().split('T')[0]}
            onChange={(e) => handleInputChange('paymentDate', new Date(e.target.value))}
          />
          <Input
            label="Días Disponibles"
            name="daysAvailable"
            type="number"
            value={formData.daysAvailable}
            onChange={(e) => handleInputChange('daysAvailable', Number(e.target.value))}
          />
          <Input
            label="Próxima Fecha de Pago"
            name="nextPaymentDate"
            type="date"
            value={formData.nextPaymentDate.toISOString().split('T')[0]}
            onChange={(e) => handleInputChange('nextPaymentDate', new Date(e.target.value))}
          />
          <Select
            label="Estado"
            name="status"
            value={formData.status}
            onChange={(value) => handleInputChange('status', value)}
            options={[
              { value: 'available', label: 'Disponible' },
              { value: 'rented', label: 'Alquilada' },
              { value: 'inactive', label: 'Inactiva' },
            ]}
          />
        </form>
        <div className="flex justify-end space-x-2 mt-4">
          <Button onClick={() => setIsModalOpen(false)}>Cancelar</Button>
          <Button onClick={handleSave}>Guardar</Button>
        </div>
      </Modal>
    </div>
  );
};

export default AccountsPage;