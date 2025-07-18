import { FaVolumeUp, FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';

interface Word {
  value: number;
  en: string;
  es: string;
}

const numbers: Word[] = [
  { value: 1, en: 'One', es: 'Uno' },
  { value: 2, en: 'Two', es: 'Dos' },
  { value: 3, en: 'Three', es: 'Tres' },
  { value: 4, en: 'Four', es: 'Cuatro' },
  { value: 5, en: 'Five', es: 'Cinco' },
  { value: 6, en: 'Six', es: 'Seis' },
  { value: 7, en: 'Seven', es: 'Siete' },
  { value: 8, en: 'Eight', es: 'Ocho' },
  { value: 9, en: 'Nine', es: 'Nueve' },
  { value: 10, en: 'Ten', es: 'Diez' },
];

const speakText = (text: string, lang: string = 'en-US') => {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = 0.9;
  utterance.pitch = 1;
  utterance.volume = 1;
  window.speechSynthesis.speak(utterance);
};

export default function Numbers() {
  const navigate = useNavigate();
  const cardRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show');
          }
        });
      },
      { threshold: 0.2 }
    );

    cardRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      cardRefs.current.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, []);

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
    opacity: 0,
    transform: 'translateY(50px)',
    transition: 'all 0.6s ease-out',
  };

  const numberStyle = {
    fontSize: '3rem',
    marginBottom: '0.5rem',
    color: '#e66b2a',
    animation: 'bounce 1.5s infinite',
    display: 'inline-block',
  };

  const labelStyle = {
    fontSize: '1.2rem',
    marginBottom: '1rem',
    fontWeight: 500,
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

  return (
    <div style={containerStyle}>
      <style>
        {`
          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }

          .show {
            opacity: 1 !important;
            transform: translateY(0) !important;
          }
        `}
      </style>

      <button style={backButtonStyle} onClick={() => navigate('/')}>
        <FaArrowLeft /> Volver
      </button>

      <h2 style={titleStyle}>Números del 1 al 10</h2>

      <div style={gridStyle}>
        {numbers.map((item, index) => (
          <div
            key={item.value}
            ref={(el) => (cardRefs.current[index] = el!)}
            style={cardStyle}
          >
            <div style={numberStyle}>{item.value}</div>
            <div style={labelStyle}>
              {item.en} / {item.es}
            </div>
            <button style={buttonStyle} onClick={() => speakText(item.en)}>
              <FaVolumeUp /> Escuchar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
