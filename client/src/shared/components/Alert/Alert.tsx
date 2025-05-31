import React from 'react';
import './Alert.scss';

export interface AlertProps {
  type?: 'success' | 'error' | 'info';
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export const Alert: React.FC<AlertProps> = ({ type = 'info', children, style }) => (
  <div className={`shared-alert ${type}`} style={style} role="alert">
    {children}
  </div>
);
