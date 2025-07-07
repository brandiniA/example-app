import { Modal } from './modal';

interface ExampleModalProps {
  open: boolean;
  onClose: () => void;
}

export const ExampleModal = ({ open, onClose }: ExampleModalProps) => {
  return (
    <Modal 
      open={open} 
      onClose={onClose}
      containerStyle={{
        maxWidth: '600px',
        padding: '30px',
      }}
    >
      <div>
        <h2 style={{ margin: '0 0 20px 0', textAlign: 'center', color: '#1f2937' }}>
          Ejemplo de Modal con Portal
        </h2>
        <p style={{ marginBottom: '20px', lineHeight: '1.5', color: '#4b5563' }}>
          Este modal se renderiza fuera del árbol DOM normal usando React Portal. 
          Observa cómo aparece por encima de todo el contenido de la página, 
          independientemente de la estructura DOM y los estilos CSS.
        </p>
        <p style={{ marginBottom: '20px', lineHeight: '1.5', color: '#4b5563' }}>
          Además, este modal implementa el manejo de la propagación de eventos:
        </p>
        <ul style={{ marginBottom: '20px', lineHeight: '1.5', color: '#4b5563' }}>
          <li>Puedes hacer clic <strong>fuera del modal</strong> para cerrarlo (el evento se captura en el overlay).</li>
          <li>Los clics <strong>dentro del modal</strong> no se propagan al overlay (usando stopPropagation).</li>
          <li>Esto permite una interacción natural con el contenido del modal sin cerrar accidentalmente.</li>
        </ul>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
          <button 
            onClick={onClose}
            style={{
              padding: '10px 20px',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            Cerrar Modal
          </button>
        </div>
      </div>
    </Modal>
  );
}; 