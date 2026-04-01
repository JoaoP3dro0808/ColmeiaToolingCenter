import React from 'react';
import Colmeia from '../components/Colmeia';

export default function SilverElectrode() {
  // Seus links aqui! Adicione quantos quiser
  const meusLinks = [
    { title: 'Produção Eletrodo', link: 'https://app.powerbi.com/groups/26c107da-94ff-4b8f-9de4-1da4f23fea94/reports/2ee3a377-7142-409d-a81a-7559fd548f75/cbfbad5de03d153fa25e?experience=power-bi', relevance: 0 },
    { title: 'Custos Produção', link: 'https://app.powerbi.com/groups/26c107da-94ff-4b8f-9de4-1da4f23fea94/reports/8159b30b-9017-45fc-a334-44a59e8083b6/1c8f19af0639a83cc8bd?experience=power-bi', relevance: 1 },
    { title: 'Estoque', link: 'https://app.powerbi.com/groups/26c107da-94ff-4b8f-9de4-1da4f23fea94/reports/5200b17f-82dc-4405-bfe5-cd2d540caf8f/3394c9f36908ae0212b0?experience=power-bi', relevance: 1 },
    { title: 'Acompanhamento Mensal', link: 'https://app.powerbi.com/groups/26c107da-94ff-4b8f-9de4-1da4f23fea94/reports/a2602571-dc69-4748-95f1-c8e3108404b9/796010f0104d02cb1db4?experience=power-bi', relevance: 1, color: { from: '#ff7e7eff', to: '#a7021bff' } },
    { title: 'Refugos', link: 'https://app.powerbi.com/groups/26c107da-94ff-4b8f-9de4-1da4f23fea94/reports/0b9c253c-05cb-4a89-bbaf-15794511e7e0/78df1f37e9c3352a7072?experience=power-bi', relevance: 1 },
  ];
  
  return <Colmeia links={meusLinks} />;
}