import React from 'react';

// Componentes simples para el ejemplo
const SomeFormHere: React.FC = () => (
  <div style={{ padding: '20px' }}>
    <h3 style={{ color: 'black', margin: '0 0 15px 0' }}>Formulario de Ejemplo</h3>
    <div style={{ marginBottom: '15px' }}>
      <label style={{ display: 'block', marginBottom: '5px', color: 'black' }}>Nombre:</label>
      <input type="text" style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #d9d9d9' }} />
    </div>
    <div>
      <label style={{ display: 'block', marginBottom: '5px', color: 'black' }}>Email:</label>
      <input type="email" style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #d9d9d9' }} />
    </div>
  </div>
);

const SubmitForm: React.FC = () => (
  <button style={{
    padding: '8px 16px',
    backgroundColor: '#1890ff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  }}>
    Enviar Formulario
  </button>
);

const CancelButton: React.FC = () => (
  <button style={{
    padding: '8px 16px',
    backgroundColor: 'white',
    color: '#1890ff',
    border: '1px solid #1890ff',
    borderRadius: '4px',
    cursor: 'pointer',
    marginLeft: '10px'
  }}>
    Cancelar
  </button>
);

// Componente ModalDialog que acepta elementos como props
const ModalDialog: React.FC<{
  content: React.ReactNode;
  footer: React.ReactNode;
}> = ({ content, footer }) => {
  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      overflow: 'hidden',
      width: '100%',
      maxWidth: '500px',
      margin: '0 auto'
    }}>
      <div style={{ padding: '20px', borderBottom: '1px solid #f0f0f0' }}>
        <h2 style={{ color: 'black', margin: '0' }}>Diálogo Modal</h2>
      </div>
      
      <div className="content" style={{ maxHeight: '300px', overflowY: 'auto' }}>
        {content}
      </div>
      
      <div className="footer" style={{ padding: '15px 20px', borderTop: '1px solid #f0f0f0', display: 'flex', justifyContent: 'flex-end' }}>
        {footer}
      </div>
    </div>
  );
};

// Componente ModalDialog mejorado que usa children
const ModalDialogWithChildren: React.FC<{
  children: React.ReactNode;
  footer: React.ReactNode;
}> = ({ children, footer }) => {
  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      overflow: 'hidden',
      width: '100%',
      maxWidth: '500px',
      margin: '0 auto'
    }}>
      <div style={{ padding: '20px', borderBottom: '1px solid #f0f0f0' }}>
        <h2 style={{ color: 'black', margin: '0' }}>Diálogo Modal</h2>
      </div>
      
      <div className="content" style={{ maxHeight: '300px', overflowY: 'auto' }}>
        {children}
      </div>
      
      <div className="footer" style={{ padding: '15px 20px', borderTop: '1px solid #f0f0f0', display: 'flex', justifyContent: 'flex-end' }}>
        {footer}
      </div>
    </div>
  );
};

export const ModalDialogExample: React.FC = () => {
  return (
    <div>
      <h3 style={{ color: '#1890ff' }}>Elementos como Props en Componentes Complejos</h3>
      
      <div style={{ 
        backgroundColor: '#1f2937',
        color: '#f9fafb',
        padding: '20px',
        borderRadius: '6px',
        marginBottom: '20px',
        overflowX: 'auto'
      }}>
        <pre style={{ margin: 0, fontSize: '14px', color: '#f9fafb', textAlign: 'left' }}>
{`const ModalDialog = ({ content, footer }) => {
    return (
        <div className="modal-dialog">
            <div className="content">{content}</div>
            <div className="footer">{footer}</div>
        </div>
    )
}`}
        </pre>
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <h4 style={{ color: 'black' }}>Ejemplo Visual:</h4>
        <ModalDialog 
          content={<SomeFormHere />} 
          footer={<SubmitForm />} 
        />
      </div>
      
      <div style={{ 
        backgroundColor: '#1f2937',
        color: '#f9fafb',
        padding: '20px',
        borderRadius: '6px',
        marginBottom: '20px',
        overflowX: 'auto'
      }}>
        <h4 style={{ color: '#1890ff', marginTop: 0 }}>Uso:</h4>
        <pre style={{ margin: 0, fontSize: '14px', color: '#f9fafb', textAlign: 'left' }}>
{`<ModalDialog content={<SomeFormHere />} footer={<SubmitForm />} />

<ModalDialog 
    content={<SomeFormHere />} 
    footer={<><SubmitForm /><CancelButton /></>} 
/>`}
        </pre>
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <h4 style={{ color: 'black' }}>Ejemplo con Múltiples Componentes:</h4>
        <ModalDialog 
          content={<SomeFormHere />} 
          footer={<><SubmitForm /><CancelButton /></>} 
        />
      </div>
      
      <div style={{ marginTop: '20px' }}>
        <p style={{ color: 'black' }}>
          <strong>Beneficios:</strong>
        </p>
        <ul style={{ color: 'black' }}>
          <li>El modal no necesita saber nada sobre el contenido o los botones</li>
          <li>Puedes pasar cualquier componente como contenido o footer</li>
          <li>Fácil de extender sin modificar el componente ModalDialog</li>
          <li>Mejor separación de responsabilidades</li>
        </ul>
      </div>
      
      <div style={{ 
        backgroundColor: '#f6ffed', 
        padding: '15px', 
        borderRadius: '6px',
        border: '1px solid #b7eb8f',
        marginTop: '30px'
      }}>
        <h4 style={{ margin: '0 0 10px 0', color: 'black' }}>🚀 Próximo Paso</h4>
        <p style={{ margin: 0, color: 'black' }}>
          Este patrón es especialmente útil para componentes de layout, donde necesitamos definir 
          la estructura pero queremos flexibilidad en el contenido.
        </p>
      </div>
    </div>
  );
};
