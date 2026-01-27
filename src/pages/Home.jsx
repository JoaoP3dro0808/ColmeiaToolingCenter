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
    { title: 'Cadastros VU', link: 'https://app.powerbi.com/groups/26c107da-94ff-4b8f-9de4-1da4f23fea94/reports/c11d4fe4-6dd1-49a9-a298-6b0b0359624b/055377c97f756e95fb6c?experience=power-bi', relevance: 1, color: { from: '#ecacffff', to: '#a400aaff' } },
    { title: 'Volume de Produção', link: 'https://app.powerbi.com/groups/26c107da-94ff-4b8f-9de4-1da4f23fea94/reports/310029bc-065d-4ce2-b725-7cb9f913fe68/ReportSection?experience=power-bi', relevance: 2 },
    { title: 'Turnover Health', filePath: 'S:/TEC/Technical_Function/1.1.Process_Develop_Tools/03.Shared/01.Process_Development/GD/02_Atividades em andamento/João Klippel/TurnoverHealth.pbix', relevance: 2 },
    { title: 'Calendário', link: '/calendar', relevance: 5 },
];
  
  return <Colmeia links={meusLinks} />;
}