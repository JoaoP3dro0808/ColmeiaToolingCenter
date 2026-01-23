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
    if (relevance === 0) return { from: '#1e8985', to: '#0f4c49'};
    if (relevance <= 2) return { from: '#2fa29d', to: '#14665f' };
    if (relevance <= 4) return { from: '#42bbb5', to: '#16756f' };
    return { from: '#5dd4ce', to: '#18837E' };
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