import React, { useState, useRef, useEffect } from 'react';
import Favo from './Favo';
import logo from '../images/icon.png';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home } from 'lucide-react';

// Função para gerar coordenadas em espiral hexagonal
const generateHexCoordinates = (relevance) => {
  if (relevance === 0) return { x: 0, y: 0 };
  
  // Direções hexagonais (6 direções)
  const directions = [
    { x: 1, y: 0 },   // direita
    { x: 0, y: 1 },   // baixo-direita
    { x: -1, y: 1 },  // baixo-esquerda
    { x: -1, y: 0 },  // esquerda
    { x: 0, y: -1 },  // cima-esquerda
    { x: 1, y: -1 },  // cima-direita
  ];
  
  let x = 0, y = 0;
  let steps = 0;
  
  // Caminha em espiral para encontrar a posição
  for (let ring = 1; ring <= relevance; ring++) {
    // Move para o início do anel
    x += directions[4].x;
    y += directions[4].y;
    
    // Percorre o anel
    for (let side = 0; side < 6; side++) {
      for (let step = 0; step < ring; step++) {
        steps++;
        if (steps === relevance) {
          return { x, y };
        }
        x += directions[side].x;
        y += directions[side].y;
      }
    }
  }
  
  return { x, y };
};

export default function Colmeia({ links }) {
  // Estados para zoom e pan
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isTransitioning, setIsTransitioning] = useState(true);
  
  const containerRef = useRef(null);
  
  // Ordena os links por relevância
  const sortedLinks = [...links].sort((a, b) => a.relevance - b.relevance);
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  
  // Gera coordenadas para cada favo
  const favos = sortedLinks.map((link, index) => {
    const coords = generateHexCoordinates(index);
    return {
      ...link,
      ...coords,
    };
  });
  
  // Handler para zoom com scroll do mouse
  const handleWheel = (e) => {
    e.preventDefault();
    
    const delta = e.deltaY * -0.001;
    const newScale = Math.min(Math.max(0.3, scale + delta), 3);
    
    setScale(newScale);
  };
  
  // Handler para iniciar o drag
  const handleMouseDown = (e) => {
    // Ignora se clicar em um link
    if (e.target.closest('a')) return;
    
    setIsDragging(true);
    setIsTransitioning(false); // Desativa transição durante drag
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };
  
  // Handler para mover enquanto arrasta
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };
  
  // Handler para parar o drag
  const handleMouseUp = () => {
    setIsDragging(false);
    setIsTransitioning(true); // Reativa transição após drag
  };
  
  // Adiciona listeners globais para mouse
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragStart]);
  
  // Adiciona listener para wheel
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
      
      return () => {
        container.removeEventListener('wheel', handleWheel);
      };
    }
  }, [scale]);
  
  return (
    <div 
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden"
      style={{
        background: 'linear-gradient(to bottom right, #111827, #007BC0, #111827)',
        cursor: isDragging ? 'grabbing' : 'grab'
      }}
      onMouseDown={handleMouseDown}
    >
      <div 
        className="absolute inset-0"
        style={{
          transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
          transformOrigin: 'center center',
          transition: isTransitioning ? 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)' : 'none'
        }}
      >
        {favos.map((favo, index) => (
          <Favo
            key={index}
            link={favo.link}
            title={favo.title}
            relevance={favo.relevance}
            x={favo.x}
            y={favo.y}
            color={favo.color}
            image={favo.image}
          />
        ))}
      </div>
      
      {/* Logo */}
      <div className="absolute top-8 left-8 pointer-events-auto z-10">
        <img src={logo} alt="Logo" className="w-38 h-27.6 drop-shadow-lg" />
      </div>

      {/* Botão Home */}
      {!isHomePage && (
        <button
          onClick={() => navigate('/')}
          className="absolute top-8 right-8 bg-gradient-to-br from-teal-600 to-teal-800 hover:from-teal-500 hover:to-teal-700 text-white p-4 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 z-10"
          aria-label="Voltar para Home"
        >
          <Home size={24} />
        </button>
      )}
      
      {/* Controles de Zoom */}
      <div className="absolute bottom-8 right-8 flex flex-col gap-2 z-10">
        <button
          onClick={() => setScale(Math.min(scale + 0.2, 3))}
          className="bg-gradient-to-br from-teal-600 to-teal-800 hover:from-teal-500 hover:to-teal-700 text-white w-12 h-12 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 text-xl font-bold"
          aria-label="Zoom in"
        >
          +
        </button>
        <button
          onClick={() => setScale(Math.max(scale - 0.2, 0.3))}
          className="bg-gradient-to-br from-teal-600 to-teal-800 hover:from-teal-500 hover:to-teal-700 text-white w-12 h-12 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 text-xl font-bold"
          aria-label="Zoom out"
        >
          −
        </button>
        <button
          onClick={() => {
            setScale(1);
            setPosition({ x: 0, y: 0 });
            setIsTransitioning(true);
          }}
          className="bg-gradient-to-br from-teal-600 to-teal-800 hover:from-teal-500 hover:to-teal-700 text-white w-12 h-12 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 text-sm font-bold"
          aria-label="Reset view"
        >
          ⟲
        </button>
      </div>
    </div>
  );
}