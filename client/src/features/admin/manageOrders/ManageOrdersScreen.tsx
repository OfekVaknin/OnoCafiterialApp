import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Table } from '../../../shared/components/Table/Table';
import { Button } from '../../../shared/components/Button/Button';
import { orderService } from '../../orders/services/orderService';
import type { Order } from '../../../shared/types/Order';
import { OrderStatusEnum } from '../../orders/enums/OrderStatusEnum';

const statusOptions = [
  { value: OrderStatusEnum.Pending, label: 'pending' },
  { value: OrderStatusEnum.Preparing, label: 'preparing' },
  { value: OrderStatusEnum.Ready, label: 'ready' },
  { value: OrderStatusEnum.Completed, label: 'completed' },
  { value: OrderStatusEnum.Cancelled, label: 'cancelled' },
];

export const ManageOrdersScreen: React.FC = () => {
  const { t } = useTranslation();
  const [orders, setOrders] = useState<Order[]>(orderService.getAll());
  const [statusFilter, setStatusFilter] = useState<string>('');

  const handleStatusChange = (orderId: string, status: string) => {
    orderService.update(orderId, { status });
    setOrders(orderService.getAll());
  };

  const filteredOrders = statusFilter
    ? orders.filter(o => o.status === statusFilter)
    : orders;

  return (
    <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
      <h2 style={{ margin: '2rem 0 1rem 0' }}>{t('manageOrders')}</h2>
      <div style={{ marginBottom: 16 }}>
        <label htmlFor="status-filter" style={{ marginInlineEnd: 8 }}>{t('filterByStatus')}:</label>
        <select
          id="status-filter"
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
        >
          <option value="">{t('all')}</option>
          {statusOptions.map(opt => (
            <option key={opt.value} value={opt.value}>{t(opt.label)}</option>
          ))}
        </select>
      </div>
      <Table
        columns={[
          { key: 'id', label: t('orderId') },
          { key: 'userId', label: t('userId') },
          { key: 'total', label: t('total') },
          { key: 'status', label: t('status'), render: order => (
            <select
              value={order.status}
              onChange={e => handleStatusChange(order.id, e.target.value)}
            >
              {statusOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{t(opt.label)}</option>
              ))}
            </select>
          ) },
          { key: 'createdAt', label: t('createdAt'), render: order => new Date(order.createdAt).toLocaleString() },
        ]}
        data={filteredOrders}
        rowKey={order => order.id}
        actions={order => (
          <Button variant="secondary" onClick={() => alert(JSON.stringify(order, null, 2))}>{t('view')}</Button>
        )}
        emptyMessage={t('noOrders')}
      />
    </div>
  );
};

export default ManageOrdersScreen;
