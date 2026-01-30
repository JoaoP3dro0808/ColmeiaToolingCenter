import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Folder, FolderOpen, SquareChevronRight  } from 'lucide-react';
import FilePathModal from './FilePathModal';

export default function Favo({ link, title, relevance, x, y, color, image, isHighlighted, filePath, onModalChange }) {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Tamanho do hexágono
  const size = 120;
  const gap = 12;
  
  const spacingX = size + gap;
  const spacingY = (size + gap) * 0.866;
  
  const posX = x * spacingX + (y % 2) * (spacingX / 2);
  const posY = y * spacingY * 0.866;
  
  const getColor = () => {
    // Se uma cor customizada foi fornecida, usa ela
    if (color) {
      // Se for um objeto com from e to, usa o gradiente
      if (typeof color === 'object' && color.from && color.to) {
        return color;
      }
      // Se for apenas uma string, usa cor sólida
      return { from: color, to: color };
    }
    
    // Caso contrário, usa a lógica baseada em relevance
    if (relevance === 0) return { from: '#0c7e74ff', to: '#134e4a' };
    if (relevance <= 2) return { from: '#14b8a6', to: '#0f766e' };
    if (relevance <= 4) return { from: '#2dd4bf', to: '#14b8a6' };
    return { from: '#5eead4', to: '#2dd4bf' };
  };

  const colors = getColor();
  
  // Verifica se é rota interna
  const isInternalRoute = link && link.startsWith('/');
  const isFilePath = !!filePath;
  
  const handleClick = (e) => {
    if (isFilePath) {
      e.preventDefault();
      if (onModalChange) onModalChange({ isOpen: true, filePath, title }); // Passa os dados
    } else if (isInternalRoute) {
      e.preventDefault();
      navigate(link);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    if (onModalChange) onModalChange(false);
  };

  const Element = isFilePath ? 'div' : 'a';
  
  return (
    <Element
      {...(!isFilePath && {
        href: isInternalRoute ? undefined : link,
        target: isInternalRoute ? undefined : "_blank",
        rel: isInternalRoute ? undefined : "noopener noreferrer"
      })}
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
        {/* Hexágono de destaque (atrás) */}
        {isHighlighted && (
          <div
            className="absolute"
            style={{
              width: `${size + 8}px`,
              height: `${size + 8}px`,
              left: '-4px',
              top: '-4px',
              clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
              background: 'white',
              boxShadow: '0 0 30px rgba(255, 255, 255, 0.9)',
              animation: 'flash 2s ease-out forwards',
              zIndex: -1
            }}
          />
        )}

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
          className="absolute inset-0 flex flex-col items-center justify-center text-white font-bold text-sm text-center px-2"
          style={{
            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
          }}
        >
          {image ? (
            <img 
              src={image} 
              alt={title} 
              className="max-w-[70%] max-h-[70%] object-contain drop-shadow-md"
            />
          ) : (
            <>
              <span className="drop-shadow-md">{title}</span>
              {isInternalRoute && (
                <SquareChevronRight  
                  size={20} 
                  className="mt-1 drop-shadow-md opacity-80" 
                />
              )}
              {isFilePath && (
                <FolderOpen 
                  size={20} 
                  className="mt-1 drop-shadow-md opacity-80" 
                />
              )}
            </>
          )}
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
    </Element>
  );
}