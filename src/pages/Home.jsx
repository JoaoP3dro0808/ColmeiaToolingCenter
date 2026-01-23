import React from 'react';
import Colmeia from '../components/Colmeia';

export default function Home() {
  // Seus links aqui! Adicione quantos quiser
  const meusLinks = [
    { title: 'Google', link: 'https://google.com', relevance: 0 },
    { title: 'GitHub', link: 'https://github.com', relevance: 1 },
    { title: 'YouTube', link: 'https://youtube.com', relevance: 1 },
    { title: 'Twitter', link: 'https://twitter.com', relevance: 2 },
    { title: 'Reddit', link: 'https://reddit.com', relevance: 2 },
    { title: 'LinkedIn', link: 'https://linkedin.com', relevance: 3 },
    { title: 'Stack OF', link: 'https://stackoverflow.com', relevance: 3 },
    { title: 'MDN', link: 'https://developer.mozilla.org', relevance: 4 },
    { title: 'Dev.to', link: 'https://dev.to', relevance: 4 },
    { title: 'Medium', link: 'https://medium.com', relevance: 5 },
    { title: 'Hacker News', link: 'https://news.ycombinator.com', relevance: 5 },
    { title: 'CodePen', link: 'https://codepen.io', relevance: 6 },
  ];
  
  return <Colmeia links={meusLinks} />;
}