import React from 'react';
import './Modal.scss';

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

export const Modal: React.FC<ModalProps> = ({ open, onClose, children, title }) => {
  if (!open) return null;
  return (
    <div className="shared-modal-backdrop" onClick={onClose}>
      <div className="shared-modal" onClick={e => e.stopPropagation()} role="dialog" aria-modal="true">
        <button className="shared-modal-close" onClick={onClose} aria-label="Close">&times;</button>
        {title && <h3 style={{marginTop: 0}}>{title}</h3>}
        {children}
      </div>
    </div>
  );
};
