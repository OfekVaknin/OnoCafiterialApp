import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { orderService } from './services/orderService';
import type { Order } from './types/Order';
import { Table } from '../../shared/components/Table/Table';
import { Modal } from '../../shared/components/Modal/Modal';
import { Button } from '../../shared/components/Button/Button';
import { useSearchParams } from 'react-router-dom';
import { menuItemService } from '../menu/services/menuItemService';
import type { MenuItem } from '../menu/types/MenuItem';
import type { OrderItem } from './types/OrderItem';
import { Select } from '../../shared/components/Select/Select';
import { OrderStatusEnum } from './enums/OrderStatusEnum';
import { authService } from '../auth/services/authService';

const statusOptions = [
  { value: '', label: 'all' },
  { value: OrderStatusEnum.Pending, label: 'pending' },
  { value: OrderStatusEnum.Preparing, label: 'preparing' },
  { value: OrderStatusEnum.Ready, label: 'ready' },
  { value: OrderStatusEnum.Completed, label: 'completed' },
  { value: OrderStatusEnum.Cancelled, label: 'cancelled' },
];

const OrdersScreen: React.FC = () => {
  const { t, i18n } = useTranslation();
  const userId = authService.getCurrentUser()?.id || 'guest';
  const [statusFilter, setStatusFilter] = useState('');
  const [dateFilter, setDateFilter] = useState<'today' | 'week' | 'month' | 'all'>('all');
  const [searchParams, setSearchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');
  
  const allOrders = orderService.getAll().filter(o => o.userId === userId);
  
  const filteredOrders = useMemo(() => {
    let filtered = [...allOrders];
    
    // Apply status filter
    if (statusFilter) {
      filtered = filtered.filter(o => o.status === statusFilter);
    }
    
    // Apply date filter
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const week = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const month = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
    
    switch (dateFilter) {
      case 'today':
        filtered = filtered.filter(o => new Date(o.createdAt) >= today);
        break;
      case 'week':
        filtered = filtered.filter(o => new Date(o.createdAt) >= week);
        break;
      case 'month':
        filtered = filtered.filter(o => new Date(o.createdAt) >= month);
        break;
    }
    
    return filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [allOrders, statusFilter, dateFilter]);

  const selectedOrder = filteredOrders.find(o => o.id === orderId) || null;

  const handleRowClick = (order: Order) => {
    setSearchParams({ orderId: order.id });
  };

  const handleCloseModal = () => {
    setSearchParams({});
  };

  return (
    <div className="main-content" style={{ maxWidth: 900, margin: '0 auto', padding: '2rem 0' }}>
      <h2>{t('myOrders')}</h2>
      <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
        <div style={{ minWidth: 200 }}>
          <Select
            label={t('filterByStatus')}
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            options={statusOptions.map(opt => ({ value: opt.value, label: t(opt.label) }))}
          />
        </div>
        <div style={{ minWidth: 200 }}>
          <Select
            label={t('filterByDate')}
            value={dateFilter}
            onChange={e => setDateFilter(e.target.value as 'today' | 'week' | 'month' | 'all')}
            options={[
              { value: 'all', label: t('allTime') },
              { value: 'today', label: t('today') },
              { value: 'week', label: t('lastWeek') },
              { value: 'month', label: t('lastMonth') },
            ]}
          />
        </div>
      </div>      <Table
        columns={[
          { 
            key: 'documentNumber', 
            label: t('orderNumber'), 
            render: (order: Order) => order.documentNumber 
          },
          { 
            key: 'status', 
            label: t('status'), 
            render: (order: Order) => (
              <span style={{
                padding: '4px 8px',
                borderRadius: '4px',
                backgroundColor: order.status === OrderStatusEnum.Completed ? '#e6ffe6' : 
                               order.status === OrderStatusEnum.Cancelled ? '#ffe6e6' :
                               order.status === OrderStatusEnum.Ready ? '#e6f3ff' :
                               order.status === OrderStatusEnum.Preparing ? '#fff3e6' : '#f0f0f0'
              }}>
                {t(order.status.toLowerCase())}
              </span>
            )
          },
          { 
            key: 'createdAt', 
            label: t('createdAt'), 
            render: (order: Order) => new Date(order.createdAt).toLocaleString(i18n.language) 
          },
          { 
            key: 'total', 
            label: t('total'), 
            render: (order: Order) => (
              <span style={{ fontWeight: 600 }}>{order.total} ₪</span>
            )
          },
          {
            key: 'items',
            label: t('items'),
            render: (order: Order) => (
              <ul style={{ paddingLeft: 0, margin: 0, listStyle: 'none' }}>
                {order.items.map(item => {
                  const menuItem: MenuItem | undefined = menuItemService.getById(item.menuItemId);
                  return (
                    <li key={item.menuItemId} style={{ fontSize: 15, marginBottom: 2 }}>
                      <b>{menuItem?.name}</b>
                      <span style={{ color: '#888' }}> ({item.quantity})</span>
                    </li>
                  );
                })}
              </ul>
            )
          },
        ]}
        data={filteredOrders}
        rowKey={(order: Order) => order.id}
        emptyMessage={t('noOrders')}
        actions={(order: Order) => (
          <Button variant="secondary" onClick={() => handleRowClick(order)}>{t('view')}</Button>
        )}
      />      <Modal 
        open={!!selectedOrder} 
        onClose={handleCloseModal} 
        title={`${t('orderDetails')} #${selectedOrder ? selectedOrder.documentNumber : ''}`}
      >
        {selectedOrder && (
          <div>
            <div style={{ 
              marginBottom: 20,
              padding: 16,
              borderRadius: 8,
              backgroundColor: '#f8f9fa',
              border: '1px solid #e9ecef'
            }}>
              <div style={{ marginBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <span>
                    <b>{t('status')}:</b>{' '}
                    <span style={{
                      padding: '4px 8px',
                      borderRadius: '4px',
                      backgroundColor: selectedOrder.status === OrderStatusEnum.Completed ? '#e6ffe6' : 
                                     selectedOrder.status === OrderStatusEnum.Cancelled ? '#ffe6e6' :
                                     selectedOrder.status === OrderStatusEnum.Ready ? '#e6f3ff' :
                                     selectedOrder.status === OrderStatusEnum.Preparing ? '#fff3e6' : '#f0f0f0'
                    }}>
                      {t(selectedOrder.status.toLowerCase())}
                    </span>
                  </span>
                  <span style={{ fontWeight: 600, fontSize: '1.1em' }}>
                    {selectedOrder.total} ₪
                  </span>
                </div>
                <div><b>{t('createdAt')}:</b> {new Date(selectedOrder.createdAt).toLocaleString(i18n.language)}</div>
              </div>
            </div>
            <div style={{ marginBottom: 12 }}>
              <h3 style={{ marginBottom: 12 }}>{t('orderedItems')}</h3>
              <Table
                columns={[
                  { 
                    key: 'image', 
                    label: t('image'), 
                    render: (item: OrderItem) => {
                      const menuItem: MenuItem | undefined = menuItemService.getById(item.menuItemId);
                      return (
                        <img 
                          src={menuItem?.imageUrl || 'https://via.placeholder.com/48?text=No+Image'} 
                          alt={menuItem?.name} 
                          style={{ 
                            width: 48, 
                            height: 48, 
                            borderRadius: 8, 
                            objectFit: 'cover', 
                            background: '#f3f3f3', 
                            border: '1px solid #e3e8ee' 
                          }} 
                        />
                      );
                    } 
                  },
                  { 
                    key: 'name', 
                    label: t('name'), 
                    render: (item: OrderItem) => {
                      const menuItem: MenuItem | undefined = menuItemService.getById(item.menuItemId);
                      return (
                        <div>
                          <div style={{ fontWeight: 500 }}>{menuItem?.name || ''}</div>
                          <div style={{ fontSize: '0.9em', color: '#666' }}>{menuItem?.description || ''}</div>
                        </div>
                      );
                    }
                  },
                  { 
                    key: 'quantity', 
                    label: t('quantity'),
                    render: (item: OrderItem) => (
                      <span style={{ fontWeight: 500 }}>{item.quantity}</span>
                    )
                  },
                  { 
                    key: 'price', 
                    label: t('price'), 
                    render: (item: OrderItem) => (
                      <div>
                        <div>{item.price} ₪</div>
                        <div style={{ fontSize: '0.9em', color: '#666' }}>
                          {t('total')}: {item.price * item.quantity} ₪
                        </div>
                      </div>
                    )
                  },
                ]}
                data={selectedOrder.items}
                rowKey={(item: OrderItem) => item.menuItemId}
                emptyMessage={t('noItems')}
              />
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default OrdersScreen;
