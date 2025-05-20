import React, { useState } from 'react';
import { useData } from '../contexts/DataContext';
import { Payment } from '../types';
import Table from '../components/ui/Table';
import Modal from '../components/ui/Modal';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

const PaymentsPage: React.FC = () => {
  const { payments, addPayment, updatePayment, deletePayment, getCustomerById } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPayment, setEditingPayment] = useState<Payment | null>(null);
  const [formData, setFormData] = useState({
    customerId: '',
    amount: 0,
    method: '',
    date: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === 'amount' ? parseFloat(value) : value });
  };

  const handleSave = () => {
    if (editingPayment) {
      updatePayment(editingPayment.id, {
        ...formData,
        date: new Date(formData.date)
      });
    } else {
      addPayment({
        ...formData,
        date: new Date(formData.date)
      });
    }
    setIsModalOpen(false);
    setEditingPayment(null);
    setFormData({ customerId: '', amount: 0, method: '', date: '' });
  };

  const handleEdit = (payment: Payment) => {
    setEditingPayment(payment);
    setFormData({
      customerId: payment.customerId,
      amount: payment.amount,
      method: payment.method,
      date: payment.date.toISOString().split('T')[0]
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    deletePayment(id);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Gestión de Pagos</h1>
      <Button onClick={() => setIsModalOpen(true)}>Agregar Pago</Button>
      <Table
        data={payments}
        keyField="id"
        columns={[
          { key: 'cliente', header: 'Cliente', render: (payment: Payment) => getCustomerById(payment.customerId)?.name || 'N/A' },
          { key: 'monto', header: 'Monto', render: (payment: Payment) => `$${payment.amount.toFixed(2)}` },
          { key: 'metodo', header: 'Método', render: (payment: Payment) => payment.method },
          { key: 'fecha', header: 'Fecha', render: (payment: Payment) => new Date(payment.date).toLocaleDateString() },
          {
            key: 'acciones',
            header: 'Acciones',
            render: (payment: Payment) => (
              <div className="flex space-x-2">
                <Button onClick={() => handleEdit(payment)}>Editar</Button>
                <Button onClick={() => handleDelete(payment.id)} variant="danger">Eliminar</Button>
              </div>
            )
          }
        ]}
      />

      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <h2 className="text-xl font-bold mb-4">{editingPayment ? 'Editar Pago' : 'Agregar Pago'}</h2>
          <form className="space-y-4">
            <Input
              label="ID Cliente"
              name="customerId"
              value={formData.customerId}
              onChange={handleInputChange}
            />
            <Input
              label="Monto"
              name="amount"
              type="number"
              value={formData.amount.toString()}
              onChange={handleInputChange}
            />
            <Input
              label="Método"
              name="method"
              value={formData.method}
              onChange={handleInputChange}
            />
            <Input
              label="Fecha"
              name="date"
              type="date"
              value={formData.date}
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

export default PaymentsPage;