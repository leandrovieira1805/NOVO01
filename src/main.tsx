import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

console.log('🚀 main.tsx está sendo executado!');

const rootElement = document.getElementById('root');
console.log('📍 Elemento root encontrado:', rootElement);

if (rootElement) {
  console.log('⚛️ Criando root do React...');
  const root = createRoot(rootElement);
  console.log('🎨 Renderizando App...');
  root.render(<App />);
  console.log('✅ App renderizado com sucesso!');
} else {
  console.error('❌ Elemento root não encontrado!');
}
