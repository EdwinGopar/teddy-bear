import CardButton from '../components/CardButton';
import { FaSortNumericUp, FaShapes, FaPaw } from 'react-icons/fa';

export default function Home() {
  const wrapperStyle = {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    width: '100vw',
    padding: '2rem',
    boxSizing: 'border-box' as const,
    fontFamily: "'Segoe UI', sans-serif",
  };

  const titleStyle = {
    fontSize: '3rem',
    marginBottom: '0.5rem',
    color: '#e66b2a',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    textAlign: 'center' as const,
  };

  const subtitleStyle = {
    fontSize: '1.4rem',
    color: '#aaa',
    marginBottom: '2rem',
    textAlign: 'center' as const,
  };

  const gridStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '2rem',
    flexWrap: 'wrap' as const,
  };

  return (
    <div style={wrapperStyle}>
      <h1 style={titleStyle}>
        🧸 <span>Bilingual Teddy Bear</span>
      </h1>
      <p style={subtitleStyle}>Aprende inglés jugando</p>

      <div style={gridStyle}>
        <CardButton to="/numbers" icon={<FaSortNumericUp />} label="Números" />
        <CardButton to="/shapes" icon={<FaShapes />} label="Formas" />
        <CardButton to="/animals" icon={<FaPaw />} label="Animales" />
      </div>
    </div>
  );
}
