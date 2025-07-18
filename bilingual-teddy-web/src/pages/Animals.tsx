import { useEffect, useState } from 'react';
import { FaVolumeUp, FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import {
  Dog,
  Cat,
  Bird,
  Fish,
  Horse,

  Butterfly,

  PawPrint
} from 'phosphor-react';

interface Animal {
  en: string;
  es: string;
  Icon: React.ElementType;
}

const animals: Animal[] = [
  { en: 'Dog', es: 'Perro', Icon: Dog },
  { en: 'Cat', es: 'Gato', Icon: Cat },
  { en: 'Bird', es: 'Pájaro', Icon: Bird },
  { en: 'Fish', es: 'Pez', Icon: Fish },
  { en: 'Horse', es: 'Caballo', Icon: Horse },

  { en: 'Butterfly', es: 'Mariposa', Icon: Butterfly },
  
  { en: 'Paw', es: 'Huella', Icon: PawPrint },
];

const speakText = (text: string, lang: string = 'en-US') => {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = 0.9;
  utterance.pitch = 1;
  utterance.volume = 1;
  window.speechSynthesis.speak(utterance);
};

export default function Animals() {
  const navigate = useNavigate();
  const [bubbleText, setBubbleText] = useState('¡Hola! Soy Oso, tu guía 🐻');
  const [currentAnimal, setCurrentAnimal] = useState<Animal | null>(null);

  useEffect(() => {
    startNewRound();
  }, []);

  const startNewRound = () => {
    const random = animals[Math.floor(Math.random() * animals.length)];
    setCurrentAnimal(random);
    setBubbleText(`¿Dónde está el ${random.es}?`);
    speakText(random.en);
  };

  const handleCardClick = (animal: Animal) => {
    if (!currentAnimal) return;
    if (animal.en === currentAnimal.en) {
      setBubbleText(`¡Correcto! Eso es un ${animal.es} 🎉`);
      speakText('Great job!', 'en-US');
    } else {
      setBubbleText(`Ups... Ese no es el ${currentAnimal.es}. Intenta otra vez 🙈`);
      speakText('Try again!', 'en-US');
    }
  };

  const containerStyle = {
    padding: '2rem',
    fontFamily: "'Segoe UI', sans-serif",
    color: '#fff',
    minHeight: '100vh',
    backgroundColor: '#1e1e1e',
    position: 'relative' as const,
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
    scrollSnapAlign: 'start',
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
    margin: '0 auto',
  };

  const backButtonStyle = {
    ...buttonStyle,
    marginBottom: '2rem',
    backgroundColor: '#555',
  };

  const bearStyle = {
    position: 'fixed' as const,
    bottom: '20px',
    left: '20px',
    width: '100px',
    animation: 'wave 2s infinite',
  };

  const bubbleStyle = {
    position: 'fixed' as const,
    bottom: '140px',
    left: '140px',
    background: '#fff',
    borderRadius: '12px',
    padding: '0.5rem 1rem',
    color: '#333',
    fontWeight: 500,
    boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
    maxWidth: '220px'
  };

  return (
    <div style={containerStyle}>
      <style>
        {`
          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-8px); }
          }

          @keyframes wave {
            0% { transform: rotate(0deg); }
            25% { transform: rotate(5deg); }
            50% { transform: rotate(0deg); }
            75% { transform: rotate(-5deg); }
            100% { transform: rotate(0deg); }
          }
        `}
      </style>
      <button style={backButtonStyle} onClick={() => navigate('/')}> <FaArrowLeft /> Volver</button>
      <h2 style={titleStyle}>¿Cuál es el animal correcto?</h2>
      <div style={gridStyle}>
        {animals.map(({ en, es, Icon }, index) => (
          <div
            key={index}
            style={cardStyle}
            onClick={() => handleCardClick({ en, es, Icon })}
          >
            <Icon size={64} color="#e66b2a" style={{ marginBottom: '1rem', animation: 'bounce 2s infinite' }} />
            <div style={wordStyle}>{en}</div>
            <div style={labelStyle}>{es}</div>
            <button style={buttonStyle} onClick={(e) => { e.stopPropagation(); speakText(en); }}>
              <FaVolumeUp /> Escuchar
            </button>
          </div>
        ))}
      </div>
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <button style={buttonStyle} onClick={startNewRound}>Nuevo reto</button>
      </div>
      <div style={bubbleStyle}>
        {bubbleText}
      </div>
      <img src="/images/oso.png" alt="Guía" style={bearStyle} />
    </div>
  );
}
