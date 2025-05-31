import React from 'react';
import './Select.scss';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  error?: string;
  placeholder?: string;
}

export const Select: React.FC<SelectProps> = ({ label, options, error, placeholder, ...props }) => (
  <div className="shared-select">
    {label && <label>{label}</label>}
    <select {...props} className={error ? 'error' : ''}>
      {placeholder && <option value="" disabled selected hidden>{placeholder}</option>}
      {options.map(opt => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
    {error && <span className="select-error">{error}</span>}
  </div>
);
