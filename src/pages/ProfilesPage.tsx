import React, { useState } from 'react';
import { useData } from '../contexts/DataContext';
import { Profile } from '../types';
import Table from '../components/ui/Table';
import Modal from '../components/ui/Modal';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

const ProfilesPage: React.FC = () => {
  const { profiles, addProfile, updateProfile, deleteProfile } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProfile, setEditingProfile] = useState<Profile | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    customerId: '',
    accountId: '',
    providerId: '',
    benefits: '',
    expirationDate: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    if (editingProfile) {
      updateProfile(editingProfile.id, formData);
    } else {
      addProfile({ ...formData, expirationDate: new Date(formData.expirationDate) });
    }
    setIsModalOpen(false);
    setEditingProfile(null);
    setFormData({ name: '', customerId: '', accountId: '', providerId: '', benefits: '', expirationDate: '' });
  };

  const handleEdit = (profile: Profile) => {
    setEditingProfile(profile);
    setFormData({
      name: profile.name,
      customerId: profile.customerId,
      accountId: profile.accountId,
      providerId: profile.providerId,
      benefits: profile.benefits,
      expirationDate: profile.expirationDate.toISOString().split('T')[0]
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    deleteProfile(id);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Gestión de Perfiles</h1>
      <Button onClick={() => setIsModalOpen(true)}>Agregar Perfil</Button>
      <Table
        data={profiles}
        columns={[
          { header: 'Nombre', accessor: 'name' },
          { header: 'Cliente', accessor: 'customerId' },
          { header: 'Cuenta', accessor: 'accountId' },
          { header: 'Proveedor', accessor: 'providerId' },
          { header: 'Beneficios', accessor: 'benefits' },
          { header: 'Expiración', accessor: 'expirationDate' },
          {
            header: 'Acciones',
            accessor: 'actions',
            render: (profile: Profile) => (
              <div className="flex space-x-2">
                <Button onClick={() => handleEdit(profile)}>Editar</Button>
                <Button onClick={() => handleDelete(profile.id)} variant="danger">Eliminar</Button>
              </div>
            )
          }
        ]}
      />

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <h2 className="text-xl font-bold mb-4">{editingProfile ? 'Editar Perfil' : 'Agregar Perfil'}</h2>
          <form className="space-y-4">
            <Input
              label="Nombre"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
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
              label="ID Proveedor"
              name="providerId"
              value={formData.providerId}
              onChange={handleInputChange}
            />
            <Input
              label="Beneficios"
              name="benefits"
              value={formData.benefits}
              onChange={handleInputChange}
            />
            <Input
              label="Fecha de Expiración"
              name="expirationDate"
              type="date"
              value={formData.expirationDate}
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

export default ProfilesPage;
