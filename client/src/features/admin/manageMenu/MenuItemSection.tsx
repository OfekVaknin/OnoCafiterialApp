import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../../../shared/components/Button/Button';
import { Input } from '../../../shared/components/Input/Input';
import { Select } from '../../../shared/components/Select/Select';
import { Modal } from '../../../shared/components/Modal/Modal';
import { Alert } from '../../../shared/components/Alert/Alert';
import { Table } from '../../../shared/components/Table/Table';
import { menuCategoryService } from '../../menu/services/menuCategoryService';
import { menuItemService } from '../../menu/services/menuItemService';
import type { MenuCategory } from '../../../shared/types/MenuCategory';
import type { MenuItem } from '../../../shared/types/MenuItem';

const DEFAULT_IMAGE = 'https://via.placeholder.com/48?text=No+Image';

const defaultItem: Omit<MenuItem, 'id' | 'createdAt'> = {
  name: '',
  description: '',
  price: 0,
  imageUrl: '',
  categoryId: '',
  available: true,
};

export const MenuItemSection: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [categories] = useState<MenuCategory[]>(menuCategoryService.getAll());
  const [items, setItems] = useState<MenuItem[]>(menuItemService.getAll());
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [form, setForm] = useState<Omit<MenuItem, 'id' | 'createdAt'>>(defaultItem);
  const [editId, setEditId] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const resetForm = () => {
    setForm(defaultItem);
    setEditId(null);
    setError('');
    setSuccess('');
  };

  const openAddModal = () => {
    resetForm();
    setModalMode('add');
    setShowModal(true);
  };

  const openEditModal = (item: MenuItem) => {
    setForm({
      name: item.name,
      description: item.description || '',
      price: item.price,
      imageUrl: item.imageUrl || '',
      categoryId: item.categoryId,
      available: item.available,
    });
    setEditId(item.id);
    setModalMode('edit');
    setShowModal(true);
    setError('');
    setSuccess('');
  };

  const handleDelete = (id: string) => {
    menuItemService.delete(id);
    setItems(menuItemService.getAll());
    setSuccess(t('itemDeleted'));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!form.name || !form.categoryId || form.price <= 0) {
      setError(t('itemRequired'));
      return;
    }
    try {
      if (modalMode === 'add') {
        menuItemService.create({
          ...form,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
        });
        setSuccess(t('itemAdded'));
      } else if (modalMode === 'edit' && editId) {
        menuItemService.update(editId, form);
        setSuccess(t('itemUpdated'));
      }
      setItems(menuItemService.getAll());
      setShowModal(false);
      resetForm();
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
      <h3 style={{ textAlign: i18n.dir() === 'rtl' ? 'right' : 'left', margin: '2rem 0 1rem 0' }}>{t('menuItemsTitle')}</h3>
      <Button onClick={openAddModal} style={{ marginBottom: 16 }}>{t('addItem')}</Button>
      {success && <Alert type="success">{success}</Alert>}
      {error && <Alert type="error">{error}</Alert>}
      <Table
        columns={[
          {
            key: 'imageUrl',
            label: t('image'),
            className: 'item-image-cell',
            render: item => (
              <img
                src={item.imageUrl ? item.imageUrl : DEFAULT_IMAGE}
                alt={item.name}
                className="item-image"
                loading="lazy"
              />
            ),
          },
          { key: 'name', label: t('name') },
          { key: 'categoryId', label: t('category'), render: item => categories.find(c => c.id === item.categoryId)?.name || '-' },
          { key: 'price', label: t('price') },
          { key: 'available', label: t('available'), render: item => item.available ? t('yes') : t('no') },
        ]}
        data={items}
        rowKey={item => item.id}
        actions={item => (
          <>
            <Button variant="secondary" onClick={() => openEditModal(item)}>{t('edit')}</Button>
            <Button variant="secondary" onClick={() => handleDelete(item.id)} style={{ marginLeft: 8 }}>{t('delete')}</Button>
          </>
        )}
        emptyMessage={t('noMenuItems')}
      />
      <Modal open={showModal} onClose={() => setShowModal(false)} title={modalMode === 'add' ? t('addItem') : t('editItem')}>
        <form className="auth-form" onSubmit={handleSubmit}>
          <Input
            label={t('name')}
            value={form.name}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            required
          />
          <Select
            label={t('category')}
            options={categories.map(c => ({ value: c.id, label: c.name }))}
            value={form.categoryId}
            onChange={e => setForm(f => ({ ...f, categoryId: e.target.value }))}
            placeholder={t('selectCategory')}
            required
          />
          <Input
            label={t('price')}
            type="number"
            value={form.price}
            onChange={e => setForm(f => ({ ...f, price: Number(e.target.value) }))}
            min={0}
            required
          />
          <Input
            label={t('imageUrl')}
            value={form.imageUrl}
            onChange={e => setForm(f => ({ ...f, imageUrl: e.target.value }))}
          />
          <Select
            label={t('available')}
            options={[
              { value: 'true', label: t('yes') },
              { value: 'false', label: t('no') },
            ]}
            value={form.available ? 'true' : 'false'}
            onChange={e => setForm(f => ({ ...f, available: e.target.value === 'true' }))}
            required
          />
          {error && <Alert type="error">{error}</Alert>}
          <Button type="submit">{modalMode === 'add' ? t('add') : t('save')}</Button>
        </form>
      </Modal>
    </div>
  );
};
