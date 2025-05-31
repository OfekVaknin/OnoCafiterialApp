import React from 'react';
import './Input.scss';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, ...props }) => (
  <div className="shared-input">
    {label && <label>{label}</label>}
    <input {...props} className={error ? 'error' : ''} />
    {error && <span className="input-error">{error}</span>}
  </div>
);
