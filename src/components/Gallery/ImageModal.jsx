import React from 'react';

const modal = {
  position: 'fixed',
  zIndex: 1,
  left: 0,
  bottom: 0,
  width: '100vw',
  height: 'calc(100vh - 80px)',
  overflow: 'hidden',
  backgroundColor: 'rgba(0, 0, 0, 0.8)'
};

const close = {
  color: '#f1f1f1',
  fontSize: 25,
  marginRight: '35px',
  fontWeight: 'bold',
  cursor: 'pointer'
};

const closeContainer = {
  position: 'absolute',
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  top: 0,
  left: 0,
  height: '40px',
  width: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.8)'
};

const modalContent = {
  display: 'flex',
  alignItems: 'flex-end',
  width: '85%',
  height: '100%',
  margin: 'auto'
};

export const Modal = ({ onOpen, children }) => {
  return <div onClick={onOpen}> {children}</div>;
};

export const ModalContent = ({ onClose, children }) => {
  return (
    <div style={modal}>
      <div style={closeContainer}>
        <span style={close} onClick={onClose}>
          &times;
        </span>
      </div>
      <div style={modalContent}>{children}</div>
    </div>
  );
};
