import React from 'react';
import Colmeia from '../components/Colmeia';

export default function Forms() {
  // Seus links aqui! Adicione quantos quiser
  const meusLinks = [
    { title: 'Mod. AM - Afiação (TTB)', link: 'https://forms.cloud.microsoft/e/qFEUS6gFSE?embed=true', relevance: 0 },
    { title: 'Mod. AM - Afiação (Walter)', link: 'https://forms.cloud.microsoft/e/Wj0hPTmafr?embed=true', relevance: 1 },
    { title: 'Mod. AM Drag Finishing', link: 'https://forms.cloud.microsoft/e/E8cGTuFwnx?embed=true', relevance: 1 },
    { title: 'Mod. AM - Fabricação', link: 'https://forms.cloud.microsoft/e/VtcyZkARf2?embed=true', relevance: 1 },
    { title: 'Mod. AM - Preset', link: 'https://forms.cloud.microsoft/e/ZDLhE0LqAu?embed=true', relevance: 1 },
    { title: 'Modificação de Desenho', link: 'https://forms.cloud.microsoft/e/RJZD1WTRSN?embed=true', relevance: 1 },
    { title: 'Requisição de suporte 5s', link: 'https://forms.cloud.microsoft/e/NLvEQSUHet?embed=true', relevance: 1, color: { from: 'rgb(255, 72, 81)', to: 'rgb(143, 40, 49)' } },
  ];
  
  return <Colmeia links={meusLinks} />;
}