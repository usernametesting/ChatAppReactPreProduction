import React from 'react';
import './ConfirmModal.css';
import { ConfirmDeleteModalProps } from '../../../types/Modals/ModalTypes';



const ConfirmModal: React.FC<ConfirmDeleteModalProps> = ({  onClose,onConfirm }) => {

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Are you sure you want to delete this item?</h3>
        <div className="modal-buttons">
          <button className="confirm-button" onClick={onConfirm}>
            Yes, Delete
          </button>
          <button className="cancel-button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
