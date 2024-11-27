import React from 'react'
import './DeleteModal.css'

function DeleteModal({isOpen,onClose,onConfirm}) {
    if(!isOpen) return null;
  return (
    <div className="modal-overlay">
        <div className="modal-content">
            <h3>Are you sure you want to delete this job?</h3>
            <div className="modal-actions">
                <button className="confirm-btn" onClick={onConfirm}>Delete</button>
                <button className="cancel-btn" onClick={onClose}>Cancel</button>

            </div>
        </div>
    </div>
  )
}

export default DeleteModal