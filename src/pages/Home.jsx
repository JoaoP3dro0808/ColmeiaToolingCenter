import React from 'react';
import Colmeia from '../components/Colmeia';
import tool_icon from '../images/tool_icon.png';

export default function Home() {
  // Seus links aqui! Adicione quantos quiser
  const meusLinks = [
    { title: 'ToolManagement 2.0', link: 'https://caweb01.br.bosch.com/ToolMGNT/tracking', relevance: 0, color: { from: '#c4d9ffff', to: '#3987eeff' }, image: tool_icon },
    { title: 'ToolManagement 1.0', link: 'https://ctweb03.br.bosch.com/ToolManagement/toolManagement/home', relevance: 1, color: { from: '#cdffacff', to: '#00aa41ff' } },
    { title: 'WebRaster', link: 'https://ca-webraster.br.bosch.com/search', relevance: 1 },
    { title: 'Bosch Portal', link: 'http://ctweb02.br.bosch.com/Portal/app', relevance: 1 },
    { title: 'Daily Cockpit', link: 'https://csi.bosch.com.br/dailycockpit/products/CtP', relevance: 2 },
    { title: 'Parts Tracking', link: 'https://ctweb03.br.bosch.com/PartsTracking/home', relevance: 2 },
    { title: 'Andon ESMC', link: 'https://ct0esmc01.br.bosch.com/ESMC/Andon', relevance: 3 },
    { title: 'WorkON', link: 'https://rb-wam.bosch.com/WorkOnDashBoard/search/search.seam', relevance: 3 },
    { title: 'ToolCost 2026', link: 'https://app.powerbi.com/groups/26c107da-94ff-4b8f-9de4-1da4f23fea94/reports/aeb24f82-a87a-409d-8ef8-6ee59a78d922/ReportSection?experience=power-bi', relevance: 1 },
    { title: 'View Fabricação', link: 'https://app.powerbi.com/groups/26c107da-94ff-4b8f-9de4-1da4f23fea94/reports/d42f41cc-ef6d-49ef-82cd-8b32fce91b7f/ReportSection?experience=power-bi', relevance: 3},
    { title: 'Eletrodo de prata', link: '/silverelectrode', relevance: 2, color: { from: '#ddddddff', to: '#727272ff' } },
    { title: 'Solicitações', link: 'https://ctweb05.br.bosch.com/portalsegpat/Default', relevance: 4 },
    { title: 'Acompanhamento Ordens', link: 'https://app.powerbi.com/groups/26c107da-94ff-4b8f-9de4-1da4f23fea94/reports/e854bd6d-f1d6-4d94-a828-e8bce5da4918/ReportSection?experience=power-bi', relevance: 3 },
    { title: 'Dashboard Preset', link: 'https://ctweb03.br.bosch.com/ToolManagement/toolManagement/DashboardPreset/list', relevance: 2 },
    { title: 'Carga Máquina', link: 'https://app.powerbi.com/groups/me/reports/59a8cb8e-a480-4095-9fe3-f2140705baab/ReportSection?ctid=0ae51e19-07c8-4e4b-bb6d-648ee58410f4&experience=power-bi', relevance: 3 },
    { title: 'MyBDLinks', link: 'https://bdweblaserviceslocations.bosch.com/MyBDLinksLA/home', relevance: 3 },
    { title: 'Cadastros VU', link: 'https://app.powerbi.com/groups/26c107da-94ff-4b8f-9de4-1da4f23fea94/reports/c11d4fe4-6dd1-49a9-a298-6b0b0359624b/055377c97f756e95fb6c?experience=power-bi', relevance: 1, color: { from: '#ecacffff', to: '#c204c9ff' } },
    { title: 'Volume de Produção', link: 'https://app.powerbi.com/groups/26c107da-94ff-4b8f-9de4-1da4f23fea94/reports/310029bc-065d-4ce2-b725-7cb9f913fe68/ReportSection?experience=power-bi', relevance: 2 },
    { title: 'Turnover Health', filePath: 'S:/TEC/Technical_Function/1.1.Process_Develop_Tools/03.Shared/01.Process_Development/GD/02_Atividades em andamento/João Klippel/TurnoverHealth.pbix', relevance: 2 },
    { title: 'Calendário', link: '/calendar', relevance: 5, color: {from: '#b168c0ff', to: '#520281ff'} },
    { title: 'Dashboard - Dias de Afiação', filePath: 'S:/TEC/Technical_Function/1.1.Process_Develop_Tools/03.Shared/02.Tooling_Center/01.Logistica/3. Ferramentas para Afiação/Lista Lotes de Afiação/Desenvolvimento/Dashboard - CargaMáquina.lnk', relevance: 3 },
    { title: 'Reclamações de Qualidade', link: 'https://app.powerbi.com/groups/26c107da-94ff-4b8f-9de4-1da4f23fea94/reports/00e28cfd-7b16-4b86-9c42-ffc3a8a6e6d6/ReportSection?experience=power-bi', relevance: 2, color: {from: '#ff6d6dff', to: '#b81e2bff'} },
    { title: 'Desempenho de Ferramentas', link: 'https://app.powerbi.com/groups/26c107da-94ff-4b8f-9de4-1da4f23fea94/reports/f31b6875-7775-47a0-af45-43b3b9ad33b2/ReportSection?experience=power-bi', relevance: 1, color: { from: '#54c508ff', to: '#156e37ff' } },
    { title: 'AM - Virtual', link: 'https://app.powerbi.com/groups/26c107da-94ff-4b8f-9de4-1da4f23fea94/reports/2f2e17ee-1076-4dbb-8687-5ce130fc46df/5ad4fe5b5aec4c11314c?experience=power-bi', relevance: 3, color: {from: '#7ea6fdff', to: '#0b0281ff'} },
    { title: 'Apontamentos Brunimento', link: 'https://app.powerbi.com/groups/26c107da-94ff-4b8f-9de4-1da4f23fea94/reports/2f2e17ee-1076-4dbb-8687-5ce130fc46df/5ad4fe5b5aec4c11314c?experience=power-bi', relevance: 4 },
    { title: 'Apontamentos Troca de Rebolo', link: 'https://app.powerbi.com/groups/26c107da-94ff-4b8f-9de4-1da4f23fea94/reports/49518116-abb5-436e-91b2-ec4510811340/1b8c4d1f057e17d01303?experience=power-bi', relevance: 4 },
    { title: 'Desempenho Brunimento', link: 'https://app.powerbi.com/groups/26c107da-94ff-4b8f-9de4-1da4f23fea94/reports/6d3c3a6f-d22b-45dc-9ec1-ddde744333c3/ReportSection3338a8b7736060f7cd76?experience=power-bi', relevance: 3 },
    { title: 'SavingHometro Fabricação', link: 'https://app.powerbi.com/groups/26c107da-94ff-4b8f-9de4-1da4f23fea94/reports/c3fad5e1-f498-4ba5-ab97-5d3a06b86e5b/5302010c097ae9bf3b48?experience=power-bi', relevance: 2 },
    { title: 'Alertas de Qualidade - PDFs', link: 'https://app.powerbi.com/groups/26c107da-94ff-4b8f-9de4-1da4f23fea94/reports/c35436f5-bc71-4387-bf06-8973f91f8fae/3ad3b2f0a9b95ab33e93?experience=power-bi', relevance: 2,  color: { from: '#a000d1ff', to: '#400053ff' }},
    { title: 'Andon - Output Minutos', link: 'https://app.powerbi.com/groups/26c107da-94ff-4b8f-9de4-1da4f23fea94/reports/044f2446-21a7-4969-9cab-394badbdcc17/f04a858528833eb0b60a?experience=power-bi', relevance: 3,  color: { from: '#21d3ebff', to: '#21d4eb5d' }},
    { title: 'Formulários', link: '/forms', relevance: 2, color: { from: 'rgb(145, 211, 255)', to: 'rgb(89, 69, 180)' } },
  ];
  
  return <Colmeia links={meusLinks} />;
}