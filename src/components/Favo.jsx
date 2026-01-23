import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Favo({ link, title, relevance, x, y }) {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  
  // Tamanho do hexágono
  const size = 120;
  const gap = 12;
  
  const spacingX = size + gap;
  const spacingY = (size + gap) * 0.866;
  
  const posX = x * spacingX + (y % 2) * (spacingX / 2);
  const posY = y * spacingY * 0.866;
  
  const getColor = () => {
    if (relevance === 0) return { from: '#0c7e74ff', to: '#134e4a' }; // Teal escuro (centro)
    if (relevance <= 2) return { from: '#14b8a6', to: '#0f766e' }; // Teal médio
    if (relevance <= 4) return { from: '#2dd4bf', to: '#14b8a6' }; // Teal claro
    return { from: '#5eead4', to: '#2dd4bf' }; // Teal muito claro (periferia)
  };

  const colors = getColor();
  
  // Verifica se é rota interna
  const isInternalRoute = link.startsWith('/');
  
  const handleClick = (e) => {
    if (isInternalRoute) {
      e.preventDefault();
      navigate(link);
    }
  };
  
  return (
    <a
      href={isInternalRoute ? undefined : link}
      target={isInternalRoute ? undefined : "_blank"}
      rel={isInternalRoute ? undefined : "noopener noreferrer"}
      onClick={handleClick}
      className="absolute transition-all duration-300 group cursor-pointer"
      style={{
        left: '50%',
        top: '50%',
        transform: `translate(calc(-50% + ${posX}px), calc(-50% + ${posY}px)) scale(${isHovered ? 1.1 : 1})`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <div
          className={`shadow-lg transition-all duration-300 ${
              isHovered ? 'shadow-2xl' : ''
          }`}
          style={{
              width: `${size}px`,
              height: `${size}px`,
              clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
              background: `linear-gradient(to bottom right, ${colors.from}, ${colors.to})`
          }}
        />
        
        <div
          className="absolute inset-0 flex items-center justify-center text-white font-bold text-sm text-center px-2"
          style={{
            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
          }}
        >
          <span className="drop-shadow-md">{title}</span>
        </div>
        
        {isHovered && (
          <div
            className="absolute inset-0"
            style={{
              margin: '-2px',
            }}
          />
        )}
      </div>
    </a>
  );
}