import React, { useState } from 'react';

export default function Favo({ link, title, relevance, x, y }) {
  const [isHovered, setIsHovered] = useState(false);
  
  // Tamanho do hexágono
  const size = 120;
  const gap = 12; // Espaço entre os hexágonos (ajuste esse valor!)
  
  // Cálculo correto do spacing para hexágonos simétricos
  const spacingX = size + gap; // Distância horizontal
  const spacingY = (size + gap) * 0.866; // Distância vertical
  
  // Calcula a posição baseada nas coordenadas hexagonais
  const posX = x * spacingX + (y % 2) * (spacingX / 2);
  const posY = y * spacingY * 0.866;
  
  // Cores baseadas na relevância (mais central = mais destaque)
  const getColor = () => {
    if (relevance === 0) return { from: '#1e8985', to: '#0f4c49'};
    if (relevance <= 2) return { from: '#2fa29d', to: '#14665f' };
    if (relevance <= 4) return { from: '#42bbb5', to: '#16756f' };
    return { from: '#5dd4ce', to: '#18837E' };
  };

  const colors = getColor();
  
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="absolute transition-all duration-300 group"
      style={{
        left: '50%',
        top: '50%',
        transform: `translate(calc(-50% + ${posX}px), calc(-50% + ${posY}px)) scale(${isHovered ? 1.1 : 1})`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        {/* Hexágono usando clip-path */}
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
        
        {/* Conteúdo do favo */}
        <div
          className="absolute inset-0 flex items-center justify-center text-white font-bold text-sm text-center px-2"
          style={{
            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
          }}
        >
          <span className="drop-shadow-md">{title}</span>
        </div>
        
        {/* Borda do hexágono no hover */}
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