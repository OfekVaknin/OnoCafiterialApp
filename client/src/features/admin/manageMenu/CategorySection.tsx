import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../../../shared/components/Button/Button';
import { Input } from '../../../shared/components/Input/Input';
import { Modal } from '../../../shared/components/Modal/Modal';
import { Alert } from '../../../shared/components/Alert/Alert';
import { Table } from '../../../shared/components/Table/Table';
import { menuCategoryService } from '../../menu/services/menuCategoryService';
import { menuItemService } from '../../menu/services/menuItemService';
import type { MenuCategory } from '../../../shared/types/MenuCategory';
import type { MenuItem } from '../../../shared/types/MenuItem';

const defaultCategory: Omit<MenuCategory, 'id' | 'createdAt'> = {
  name: '',
  description: '',
};

export const CategorySection: React.FC = () => {
  const { t } = useTranslation();
  const [categories, setCategories] = useState<MenuCategory[]>(menuCategoryService.getAll());
  const [items] = useState<MenuItem[]>(menuItemService.getAll());
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [form, setForm] = useState<Omit<MenuCategory, 'id' | 'createdAt'>>(defaultCategory);
  const [editId, setEditId] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const resetForm = () => {
    setForm(defaultCategory);
    setEditId(null);
    setError('');
    setSuccess('');
  };

  const openAddModal = () => {
    resetForm();
    setModalMode('add');
    setShowModal(true);
  };

  const openEditModal = (cat: MenuCategory) => {
    setForm({
      name: cat.name,
      description: cat.description || '',
    });
    setEditId(cat.id);
    setModalMode('edit');
    setShowModal(true);
    setError('');
    setSuccess('');
  };

  const handleDelete = (id: string) => {
    const hasItems = items.some(item => item.categoryId === id);
    if (hasItems) {
      setError(t('cannotDeleteCategoryWithItems'));
      return;
    }
    menuCategoryService.delete(id);
    setCategories(menuCategoryService.getAll());
    setSuccess(t('categoryDeleted'));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!form.name) {
      setError(t('categoryNameRequired'));
      return;
    }
    try {
      if (modalMode === 'add') {
        menuCategoryService.create({
          ...form,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
        });
        setSuccess(t('categoryAdded'));
      } else if (modalMode === 'edit' && editId) {
        menuCategoryService.update(editId, form);
        setSuccess(t('categoryUpdated'));
      }
      setCategories(menuCategoryService.getAll());
      setShowModal(false);
      resetForm();
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div style={{ marginBottom: 32 }}>
      <h3>{t('categoriesTitle')}</h3>
      <Button onClick={openAddModal}>{t('addCategory')}</Button>
      {success && <Alert type="success">{success}</Alert>}
      {error && <Alert type="error">{error}</Alert>}
      <Table
        columns={[
          { key: 'name', label: t('name') },
          { key: 'description', label: t('description') },
        ]}
        data={categories}
        rowKey={cat => cat.id}
        actions={cat => (
          <>
            <Button variant="secondary" onClick={() => openEditModal(cat)}>{t('edit')}</Button>
            <Button variant="secondary" onClick={() => handleDelete(cat.id)} style={{ marginLeft: 8 }}>{t('delete')}</Button>
          </>
        )}
        emptyMessage={t('noCategories')}
      />
      <Modal open={showModal} onClose={() => setShowModal(false)} title={modalMode === 'add' ? t('addCategory') : t('editCategory')}>
        <form className="auth-form" onSubmit={handleSubmit}>
          <Input
            label={t('name')}
            value={form.name}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            required
          />
          <Input
            label={t('description')}
            value={form.description}
            onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
          />
          {error && <Alert type="error">{error}</Alert>}
          <Button type="submit">{modalMode === 'add' ? t('add') : t('save')}</Button>
        </form>
      </Modal>
    </div>
  );
};
