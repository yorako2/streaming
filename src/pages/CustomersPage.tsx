import React, { useState } from 'react';
import { Download, Plus, Search, Filter } from 'lucide-react';
import Card from '../components/ui/Card';
import Table from '../components/ui/Table';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Modal from '../components/ui/Modal';
import { useData } from '../contexts/DataContext';
import { Customer } from '../types';

const CustomersPage = () => {
  const { customers, addCustomer, updateCustomer, deleteCustomer, getSalesByCustomerId } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [formData, setFormData] = useState<Omit<Customer, 'id' | 'createdAt'>>({
    name: '',
    phone: '',
    email: '',
    country: '',
    comment: '',
    status: 'active',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    if (editingCustomer) {
      updateCustomer(editingCustomer.id, formData);
    } else {
      addCustomer(formData);
    }
    setIsModalOpen(false);
    setEditingCustomer(null);
    setFormData({
      name: '',
      phone: '',
      email: '',
      country: '',
      comment: '',
      status: 'active',
    });
  };

  const handleEdit = (customer: Customer) => {
    setEditingCustomer(customer);
    setFormData({
      name: customer.name,
      phone: customer.phone,
      email: customer.email,
      country: customer.country,
      comment: customer.comment || '',
      status: customer.status,
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    deleteCustomer(id);
  };

  const columns = [
    {
      key: 'name',
      header: 'Nombre',
      sortable: true,
    },
    {
      key: 'phone',
      header: 'Teléfono',
      sortable: true,
    },
    {
      key: 'email',
      header: 'Email',
      sortable: true,
    },
    {
      key: 'country',
      header: 'País',
      sortable: true,
    },
    {
      key: 'status',
      header: 'Estado',
      sortable: true,
    },
    {
      key: 'actions',
      header: 'Acciones',
      render: (customer: Customer) => (
        <div className="flex space-x-2">
          <Button onClick={() => handleEdit(customer)}>Editar</Button>
          <Button variant="danger" onClick={() => handleDelete(customer.id)}>
            Eliminar
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Gestión de Clientes</h1>
        <Button onClick={() => setIsModalOpen(true)}>Agregar Cliente</Button>
      </div>
      <Table
        data={customers}
        columns={columns}
        keyField="id"
      />
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-xl font-bold mb-4">
          {editingCustomer ? 'Editar Cliente' : 'Agregar Cliente'}
        </h2>
        <form className="space-y-4">
          <Input
            label="Nombre"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
          <Input
            label="Teléfono"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
          />
          <Input
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <Input
            label="País"
            name="country"
            value={formData.country}
            onChange={handleInputChange}
          />
          <Input
            label="Comentario"
            name="comment"
            value={formData.comment}
            onChange={handleInputChange}
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

export default CustomersPage;