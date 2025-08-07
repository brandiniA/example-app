import React, { useRef } from 'react';

interface RenderCounterProps {
  name: string;
  color?: string;
}

export const RenderCounter: React.FC<RenderCounterProps> = ({ name, color = '#1890ff' }) => {
  const renderCount = useRef(0);
  
  // Incrementar contador de renderizados en cada render
  renderCount.current += 1;
  
  return (
    <div style={{ 
      display: 'inline-flex',
      alignItems: 'center',
      padding: '4px 8px', 
      backgroundColor: '#fff',
      borderRadius: '4px',
      border: `1px solid ${color}`,
      marginRight: '8px',
      marginBottom: '8px'
    }}>
      <span style={{ 
        marginRight: '6px',
        color: 'black',
        fontSize: '14px',
        fontWeight: 'bold'
      }}>
        {name}:
      </span>
      <span style={{ 
        backgroundColor: color,
        color: 'white',
        padding: '2px 6px',
        borderRadius: '10px',
        fontSize: '12px',
        fontWeight: 'bold'
      }}>
        {renderCount.current} renders
      </span>
    </div>
  );
};
