import React from 'react';

const DividerWithText = ({ children, ...otherProps }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', color: '#ccc' }} {...otherProps}>
      <div flex={1}>
        <hr style={{ borderColor: '#ccc' }} />
      </div>
      <span style={{ padding: '8px', fontWeight: 'bold' }}>{children}</span>
      <div flex={1}>
        <hr style={{ borderColor: '#ccc' }} />
      </div>
    </div>
  );
};

export default DividerWithText;
