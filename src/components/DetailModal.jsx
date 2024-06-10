// src/components/DetailModal.jsx
import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const DetailModal = ({ show, onHide, details }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{details.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img src={details.image} alt={details.name} className="img-fluid mb-3" />
        <p><strong>Estado:</strong> {details.status}</p>
        <p><strong>Especie:</strong> {details.species}</p>
        <p><strong>Género:</strong> {details.gender}</p>
        <p><strong>Origen:</strong> {details.origin}</p>
        <p><strong>Ubicación:</strong> {details.location}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DetailModal;
