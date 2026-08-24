import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import BlogArticle from '../components/BlogArticle';
import '../index.css';
import './blog.css';

if (typeof document !== 'undefined') {
  const container = document.getElementById('root');
  if (!container) throw new Error('Could not find root element to mount to');
  const app = <React.StrictMode><BlogArticle /></React.StrictMode>;
  if (container.hasChildNodes()) hydrateRoot(container, app);
  else createRoot(container).render(app);
}
