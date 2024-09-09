import React from 'react';

const Buttons = ({ children, style, onClick }) => {
  const defaultStyle = {
    backgroundColor: '#004AAD', 
    color: '#FFFFFF',           
    border: 'none',
    borderRadius: '4px',
    padding: '10px 20px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s ease',
    ...style, 
  };

  return (
    <button style={defaultStyle} onClick={onClick}>
      {children}
    </button>
  );
};

export default Buttons;
