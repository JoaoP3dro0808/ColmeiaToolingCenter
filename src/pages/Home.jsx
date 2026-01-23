import React from 'react';
import Colmeia from '../components/Colmeia';

export default function Home() {
  // Seus links aqui! Adicione quantos quiser
  const meusLinks = [
    { title: 'ToolManagement', link: 'https://ctweb03.br.bosch.com/ToolManagement/toolManagement/home', relevance: 0 },
    { title: 'WebRaster', link: 'https://ca-webraster.br.bosch.com/search', relevance: 1 },
    { title: 'Bosch Portal', link: 'http://ctweb02.br.bosch.com/Portal/app', relevance: 1 },
    { title: 'Daily Cockpit', link: 'https://csi.bosch.com.br/dailycockpit/products/CtP', relevance: 2 },
    { title: 'Parts Tracking', link: 'https://ctweb03.br.bosch.com/PartsTracking/home', relevance: 2 },
    { title: 'Andon ESMC', link: 'https://ct0esmc01.br.bosch.com/ESMC/Andon', relevance: 3 },
    { title: 'WorkON', link: 'https://rb-wam.bosch.com/WorkOnDashBoard/search/search.seam', relevance: 3 },
    { title: 'ToolCost 2026', link: 'https://app.powerbi.com/groups/26c107da-94ff-4b8f-9de4-1da4f23fea94/reports/aeb24f82-a87a-409d-8ef8-6ee59a78d922/ReportSection?experience=power-bi', relevance: 1 },
    { title: 'View Fabricação', link: 'https://app.powerbi.com/groups/26c107da-94ff-4b8f-9de4-1da4f23fea94/reports/d42f41cc-ef6d-49ef-82cd-8b32fce91b7f/ReportSection?experience=power-bi', relevance: 3},
    { title: 'Eletrodo de prata', link: '/silverelectrode', relevance: 2 }
];
  
  return <Colmeia links={meusLinks} />;
}