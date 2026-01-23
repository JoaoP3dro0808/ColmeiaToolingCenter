import React from 'react';
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
  
  return (
    <div className="relative w-full h-screen overflow-hidden" style={{
      background: 'linear-gradient(to bottom right, #111827, #007BC0, #111827)'
    }}>
      <div className="absolute inset-0">
        {favos.map((favo, index) => (
          <Favo
            key={index}
            link={favo.link}
            title={favo.title}
            relevance={favo.relevance}
            x={favo.x}
            y={favo.y}
          />
        ))}
      </div>
      
      {/* Logo */}
        <div className="absolute top-8 left-8">
            <img src={logo} alt="Logo" className="w-38 h-27.6 drop-shadow-lg" />
        </div>

      {/* Botão Home */}
        {!isHomePage && (
          <button
            onClick={() => navigate('/')}
            className="absolute top-8 right-8 bg-gradient-to-br from-teal-600 to-teal-800 hover:from-teal-500 hover:to-teal-700 text-white p-4 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110"
            aria-label="Voltar para Home"
          >
            <Home size={24} />
          </button>
        )}
    </div>
  );
}