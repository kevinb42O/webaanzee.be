import React from 'react';
import { renderToString } from 'react-dom/server';
import App from '../App';
import { PrivacyPage } from '../privacy';
import { KlantenkaartPage } from '../klantenkaart';
import BlogArticle from '../components/BlogArticle';
import { PwaymentPage } from '../pwayment';

const pages: Record<string, React.ReactElement> = {
  'index.html': <App />,
  'privacy.html': <PrivacyPage />,
  'klantenkaart.html': <KlantenkaartPage />,
  'pwayment.html': <PwaymentPage />,
  'blog/waarom-website-nodig-2026.html': <BlogArticle />,
};

export function render(page: string): string {
  const element = pages[page];
  if (!element) throw new Error(`Unknown prerender page: ${page}`);
  return renderToString(element);
}
