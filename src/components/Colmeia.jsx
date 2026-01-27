import React, { useState, useRef, useEffect } from 'react';
import Favo from './Favo';
import logo from '../images/icon.png';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Search, X } from 'lucide-react';

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
  
  // Estados para pesquisa
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [filteredFavos, setFilteredFavos] = useState([]);
  const [highlightedFavo, setHighlightedFavo] = useState(null);
  
  const containerRef = useRef(null);
  const searchInputRef = useRef(null);
  
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
  
  // Atualiza resultados da pesquisa
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredFavos([]);
    } else {
      const filtered = favos.filter(favo =>
        favo.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredFavos(filtered);
    }
  }, [searchTerm]);
  
  // Foca no input quando abre a pesquisa
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);
  
  // Função para centralizar em um favo
  const focusOnFavo = (favo) => {
    const size = 120;
    const gap = 12;
    const spacingX = size + gap;
    const spacingY = (size + gap) * 0.866;
    
    const posX = favo.x * spacingX + (favo.y % 2) * (spacingX / 2);
    const posY = favo.y * spacingY * 0.866;
    
    setPosition({ x: -posX, y: -posY });
    setScale(1.5);
    setIsTransitioning(true);
    setSearchTerm('');
    setIsSearchOpen(false);

    // Destaca o favo
    setHighlightedFavo(favo.title);
    
    // Remove o destaque após 2 segundos
    setTimeout(() => {
      setHighlightedFavo(null);
    }, 2000);
  };
  
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
    setIsTransitioning(false);
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
    setIsTransitioning(true);
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
            isHighlighted={highlightedFavo === favo.title}
            filePath={favo.filePath}
          />
        ))}
      </div>
      
      {/* Logo */}
      <div className="absolute top-8 left-8 pointer-events-auto z-10">
        <img src={logo} alt="Logo" className="w-38 h-27.6 drop-shadow-lg" />
      </div>

      {/* Barra de Pesquisa */}
      <div className="absolute top-8 right-8 z-10 flex items-start gap-2">
        {isSearchOpen ? (
          <div className="relative">
            <div className="flex items-center gap-2 bg-gradient-to-br from-teal-600 to-teal-800 rounded-full shadow-lg px-4 py-2">
              <Search size={20} className="text-white" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar favo..."
                className="bg-transparent text-white placeholder-teal-200 outline-none w-48"
              />
              <button
                onClick={() => {
                  setIsSearchOpen(false);
                  setSearchTerm('');
                }}
                className="text-white hover:text-teal-200 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            {/* Resultados da pesquisa */}
            {filteredFavos.length > 0 && (
              <div className="absolute top-full mt-2 right-0 bg-gradient-to-br from-teal-700 to-teal-900 rounded-lg shadow-2xl overflow-hidden min-w-[250px] max-h-[300px] overflow-y-auto">
                {filteredFavos.map((favo, index) => (
                  <button
                    key={index}
                    onClick={() => focusOnFavo(favo)}
                    className="w-full text-left px-4 py-3 text-white hover:bg-teal-600 transition-colors border-b border-teal-600 last:border-b-0"
                  >
                    {favo.title}
                  </button>
                ))}
              </div>
            )}
            
            {/* Mensagem de nenhum resultado */}
            {searchTerm && filteredFavos.length === 0 && (
              <div className="absolute top-full mt-2 right-0 bg-gradient-to-br from-teal-700 to-teal-900 rounded-lg shadow-2xl px-4 py-3 text-white min-w-[250px]">
                Nenhum favo encontrado
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => setIsSearchOpen(true)}
            className="bg-gradient-to-br from-teal-600 to-teal-800 hover:from-teal-500 hover:to-teal-700 text-white p-4 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110"
            aria-label="Pesquisar"
          >
            <Search size={24} />
          </button>
        )}
        
        {/* Botão Home */}
        {!isHomePage && (
          <button
            onClick={() => navigate('/')}
            className="bg-gradient-to-br from-teal-600 to-teal-800 hover:from-teal-500 hover:to-teal-700 text-white p-4 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110"
            aria-label="Voltar para Home"
          >
            <Home size={24} />
          </button>
        )}
      </div>
      
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