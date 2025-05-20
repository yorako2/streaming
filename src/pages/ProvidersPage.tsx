import React, { useState } from 'react';
import { useData } from '../contexts/DataContext';
import { Provider } from '../types';
import Table from '../components/ui/Table';
import Modal from '../components/ui/Modal';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

const ProvidersPage: React.FC = () => {
  const { providers, addProvider, updateProvider, deleteProvider } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProvider, setEditingProvider] = useState<Provider | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    email: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    if (editingProvider) {
      updateProvider(editingProvider.id, formData);
    } else {
      addProvider(formData);
    }
    setIsModalOpen(false);
    setEditingProvider(null);
    setFormData({ name: '', contact: '', email: '' });
  };

  const handleEdit = (provider: Provider) => {
    setEditingProvider(provider);
    setFormData({
      name: provider.name,
      contact: provider.contact,
      email: provider.email
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    deleteProvider(id);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Gestión de Proveedores</h1>
      <Button onClick={() => setIsModalOpen(true)}>Agregar Proveedor</Button>
      <Table
        data={providers}
        keyField="id"
        columns={[
          { key: 'nombre', header: 'Nombre', render: (provider: Provider) => provider.name },
          { key: 'contacto', header: 'Contacto', render: (provider: Provider) => provider.contact },
          { key: 'email', header: 'Email', render: (provider: Provider) => provider.email },
          {
            key: 'acciones',
            header: 'Acciones',
            render: (provider: Provider) => (
              <div className="flex space-x-2">
                <Button onClick={() => handleEdit(provider)}>Editar</Button>
                <Button onClick={() => handleDelete(provider.id)} variant="danger">Eliminar</Button>
              </div>
            )
          }
        ]}
      />

      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <h2 className="text-xl font-bold mb-4">{editingProvider ? 'Editar Proveedor' : 'Agregar Proveedor'}</h2>
          <form className="space-y-4">
            <Input
              label="Nombre"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
            <Input
              label="Contacto"
              name="contact"
              value={formData.contact}
              onChange={handleInputChange}
            />
            <Input
              label="Email"
              name="email"
              type="email"
              value={formData.email}
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

export default ProvidersPage;
