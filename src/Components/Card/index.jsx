import React from 'react';
import styled from 'styled-components';

const Tarjeta = styled.div`
  text-align= center;
  justify-content: center;
`;

const Card = ({ children, className = '' }) => {
  return (
    <Tarjeta
      className={`card ${className}`}
      style={{
        // backgroundColor: useColorModeValue('white', '#333'), // Adjust for dark mode
        padding: '8px',
        paddingLeft: '4px',
        paddingRight: (props) => (props.isMobile ? '4px' : '10px'), // Responsive padding
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)', // Basic shadow
        borderRadius: '10px', // Adjust as needed
      }}
    >
      {children}
    </Tarjeta>
  );
};

export default Card;
