import React, { useState } from 'react';
import { useData } from '../contexts/DataContext';
import { Sale, Platform } from '../types';
import Table from '../components/ui/Table';
import Modal from '../components/ui/Modal';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

const SalesPage: React.FC = () => {
  const { sales, addSale, updateSale, cancelSale, getCustomerById, getAccountById } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSale, setEditingSale] = useState<Sale | null>(null);
  const [formData, setFormData] = useState({
    customerId: '',
    accountId: '',
    platform: '' as Platform,
    price: 0,
    paymentDate: '',
    expiryDate: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === 'price' ? parseFloat(value) : value });
  };

  const handleSave = () => {
    if (editingSale) {
      updateSale(editingSale.id, {
        ...formData,
        paymentDate: new Date(formData.paymentDate),
        expiryDate: new Date(formData.expiryDate)
      });
    } else {
      addSale({
        ...formData,
        paymentDate: new Date(formData.paymentDate),
        expiryDate: new Date(formData.expiryDate),
        type: 'full',
        customerName: getCustomerById(formData.customerId)?.name || '',
        customerContact: '',
        days: 30
      });
    }
    setIsModalOpen(false);
    setEditingSale(null);
    setFormData({ customerId: '', accountId: '', platform: '' as Platform, price: 0, paymentDate: '', expiryDate: '' });
  };

  const handleEdit = (sale: Sale) => {
    setEditingSale(sale);
    setFormData({
      customerId: sale.customerId,
      accountId: sale.accountId,
      platform: sale.platform,
      price: sale.price,
      paymentDate: sale.paymentDate.toISOString().split('T')[0],
      expiryDate: sale.expiryDate.toISOString().split('T')[0]
    });
    setIsModalOpen(true);
  };

  const handleCancel = (id: string) => {
    cancelSale(id);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Gestión de Ventas</h1>
      <Button onClick={() => setIsModalOpen(true)}>Agregar Venta</Button>
      <Table
        data={sales}
        keyField="id"
        columns={[
          { key: 'cliente', header: 'Cliente', render: (sale: Sale) => getCustomerById(sale.customerId)?.name || 'N/A' },
          { key: 'cuenta', header: 'Cuenta', render: (sale: Sale) => getAccountById(sale.accountId)?.email || 'N/A' },
          { key: 'plataforma', header: 'Plataforma', render: (sale: Sale) => sale.platform },
          { key: 'precio', header: 'Precio', render: (sale: Sale) => `$${sale.price.toFixed(2)}` },
          { key: 'fechaPago', header: 'Fecha de Pago', render: (sale: Sale) => new Date(sale.paymentDate).toLocaleDateString() },
          { key: 'expiracion', header: 'Expiración', render: (sale: Sale) => new Date(sale.expiryDate).toLocaleDateString() },
          {
            key: 'acciones',
            header: 'Acciones',
            render: (sale: Sale) => (
              <div className="flex space-x-2">
                <Button onClick={() => handleEdit(sale)}>Editar</Button>
                <Button onClick={() => handleCancel(sale.id)} variant="danger">Cancelar</Button>
              </div>
            )
          }
        ]}
      />

      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <h2 className="text-xl font-bold mb-4">{editingSale ? 'Editar Venta' : 'Agregar Venta'}</h2>
          <form className="space-y-4">
            <Input
              label="ID Cliente"
              name="customerId"
              value={formData.customerId}
              onChange={handleInputChange}
            />
            <Input
              label="ID Cuenta"
              name="accountId"
              value={formData.accountId}
              onChange={handleInputChange}
            />
            <Input
              label="Plataforma"
              name="platform"
              value={formData.platform}
              onChange={handleInputChange}
            />
            <Input
              label="Precio"
              name="price"
              type="number"
              value={formData.price.toString()}
              onChange={handleInputChange}
            />
            <Input
              label="Fecha de Pago"
              name="paymentDate"
              type="date"
              value={formData.paymentDate}
              onChange={handleInputChange}
            />
            <Input
              label="Fecha de Expiración"
              name="expiryDate"
              type="date"
              value={formData.expiryDate}
              onChange={handleInputChange}
            />
          </form>
          <div className="flex justify-end space-x-2 mt-4">
            <Button onClick={() => setIsModalOpen(false)} variant="secondary">Cancelar</Button>
            <Button onClick={handleSave}>Guardar</Button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default SalesPage;