import { Link } from 'react-router-dom';
import { useState, type ReactNode } from 'react';


interface CardButtonProps {
  to: string;
  icon: ReactNode;
  label: string;
}

export default function CardButton({ to, icon, label }: CardButtonProps) {
  const [hover, setHover] = useState(false);

  const baseStyle = {
    background: '#fff3e6',
    border: '2px solid #ffb085',
    borderRadius: '16px',
    padding: '2.5rem',
    width: '220px',
    height: '220px',
    textAlign: 'center' as const,
    textDecoration: 'none',
    color: '#333',
    fontSize: '1.4rem',
    fontWeight: 600,
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'center',
    alignItems: 'center',
    transform: hover ? 'scale(1.05)' : 'scale(1)',
    boxShadow: hover ? '0 6px 18px rgba(0,0,0,0.15)' : 'none',
    transition: 'transform 0.3s, box-shadow 0.3s',
    cursor: 'pointer',
  };

  const iconStyle = {
    fontSize: '4rem',
    marginBottom: '1rem',
    color: '#e66b2a',
  };

  return (
    <Link
      to={to}
      style={baseStyle}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div style={iconStyle}>{icon}</div>
      <p>{label}</p>
    </Link>
  );
}
