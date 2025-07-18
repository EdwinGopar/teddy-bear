import { FaVolumeUp, FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

interface Word {
  en: string;
  es: string;
  shape: 'circle' | 'square' | 'triangle' | 'rectangle' | 'star' | 'heart' | 'oval' | 'diamond';
}

const shapes: Word[] = [
  { en: 'Circle', es: 'Círculo', shape: 'circle' },
  { en: 'Square', es: 'Cuadrado', shape: 'square' },
  { en: 'Triangle', es: 'Triángulo', shape: 'triangle' },
  { en: 'Rectangle', es: 'Rectángulo', shape: 'rectangle' },
  { en: 'Star', es: 'Estrella', shape: 'star' },
  { en: 'Heart', es: 'Corazón', shape: 'heart' },
  { en: 'Oval', es: 'Óvalo', shape: 'oval' },
  { en: 'Diamond', es: 'Rombo', shape: 'diamond' },
];

const speakText = (text: string, lang: string = 'en-US') => {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = 0.9;
  utterance.pitch = 1;
  utterance.volume = 1;
  window.speechSynthesis.speak(utterance);
};

export default function Shapes() {
  const navigate = useNavigate();

  const getFigureStyle = (shape: string) => {
    const base = {
      width: '60px',
      height: '60px',
      margin: '0 auto 1rem',
      backgroundColor: '#e66b2a',
      animation: '',
    } as any;

    switch (shape) {
      case 'circle':
        return { ...base, borderRadius: '50%', animation: 'spin 5s linear infinite' };
      case 'square':
        return { ...base, animation: 'pulse 2s infinite' };
      case 'triangle':
        return {
          width: 0,
          height: 0,
          borderLeft: '30px solid transparent',
          borderRight: '30px solid transparent',
          borderBottom: '60px solid #e66b2a',
          margin: '0 auto 1rem',
          animation: 'bounce 2s infinite',
        };
      case 'rectangle':
        return {
          ...base,
          width: '80px',
          height: '40px',
          animation: 'slide 3s ease-in-out infinite',
        };
      case 'star':
        return {
          ...base,
          clipPath:
            'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
          animation: 'pulse 2s infinite',
        };
      case 'heart':
        return {
          ...base,
          clipPath:
            'polygon(50% 80%, 20% 50%, 20% 20%, 50% 0%, 80% 20%, 80% 50%)',
          animation: 'beat 1s infinite',
        };
      case 'oval':
        return { ...base, borderRadius: '50% / 30%', animation: 'rotate 4s linear infinite' };
      case 'diamond':
        return { ...base, transform: 'rotate(45deg)', animation: 'pulse 2s infinite' };
      default:
        return base;
    }
  };

  const containerStyle = {
    padding: '2rem',
    fontFamily: "'Segoe UI', sans-serif",
    color: '#fff',
    minHeight: '100vh',
    backgroundColor: '#1e1e1e',
  };

  const titleStyle = {
    textAlign: 'center' as const,
    marginBottom: '2rem',
    fontSize: '2rem',
    color: '#ff9d63',
  };

  const gridStyle = {
    display: 'flex',
    flexWrap: 'wrap' as const,
    justifyContent: 'center',
    gap: '2rem',
  };

  const cardStyle = {
    background: '#fff3e6',
    border: '2px solid #ffb085',
    borderRadius: '16px',
    padding: '1.5rem',
    width: '180px',
    textAlign: 'center' as const,
    transition: 'transform 0.2s',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'space-between',
  };

  const wordStyle = {
    fontSize: '1.4rem',
    marginBottom: '0.5rem',
    color: '#e66b2a',
    fontWeight: 600,
  };

  const labelStyle = {
    fontSize: '1.1rem',
    marginBottom: '1rem',
    fontWeight: 500,
    color: '#444',
  };

  const buttonStyle = {
    backgroundColor: '#e66b2a',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    padding: '0.5rem 1rem',
    fontSize: '1rem',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    marginTop: 'auto',
  };

  const backButtonStyle = {
    ...buttonStyle,
    marginBottom: '2rem',
    backgroundColor: '#555',
  };

  return (
    <div style={containerStyle}>
      <style>
        {`
          @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
          @keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.1); } }
          @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
          @keyframes slide { 0% { transform: translateX(0); } 50% { transform: translateX(10px); } 100% { transform: translateX(0); } }
          @keyframes beat { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.2); } }
          @keyframes rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        `}
      </style>

      <button style={backButtonStyle} onClick={() => navigate('/')}>
        <FaArrowLeft /> Volver
      </button>

      <h2 style={titleStyle}>Formas básicas</h2>
      <div style={gridStyle}>
        {shapes.map((item, index) => (
          <div key={index} style={cardStyle}>
            <div style={getFigureStyle(item.shape)} />
            <div style={wordStyle}>{item.en}</div>
            <div style={labelStyle}>{item.es}</div>
            <button style={buttonStyle} onClick={() => speakText(item.en)}>
              <FaVolumeUp /> Escuchar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
