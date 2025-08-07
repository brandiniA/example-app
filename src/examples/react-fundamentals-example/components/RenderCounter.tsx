import React, { useState, useEffect, useRef } from 'react';

// Componente para mostrar re-renderizados en tiempo real
export const RenderCounter = ({ name }: { name: string }) => {
  const renderCount = useRef(0);
  renderCount.current++;

  
  return (
    <div style={{ 
      padding: '8px 12px', 
      backgroundColor: '#e6f7ff', 
      borderRadius: '4px', 
      margin: '4px 0',
      border: '1px solid #91caff',
      fontSize: '14px'
    }}>
      {name}: {renderCount.current} re-renderizados
    </div>
  );
};
