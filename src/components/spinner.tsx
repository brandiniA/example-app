import './spinner.css';

export const Spinner = ({ size = 'medium' }: { size?: 'small' | 'medium' | 'large' }) => {
  return (
    <div className={`spinner-container size-${size}`}>
      <div className="spinner"></div>
    </div>
  );
}