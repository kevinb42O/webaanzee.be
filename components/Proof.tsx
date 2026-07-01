import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell } from 'recharts';
import styles from './Proof.module.css';

interface CaseStudy {
  id: string;
  title: string;
  website: string;
  location: string;
  chartData: { name: string; views: number }[];
  stats: { impressions: number; clicks: number; ctr: string; avgPosition: string };
  quote: string;
  author: string;
  role: string;
}

const caseStudies: CaseStudy[] = [
  {
    id: 'vishandel',
    title: 'vishandelolivierenkelly.be',
    website: 'https://www.vishandelolivierenkelly.be',
    location: 'Blankenberge',
    chartData: [
      { name: 'Geen website', views: 0 },
      { name: 'Bouw', views: 980 },
      { name: 'Na launch', views: 4510 },
    ],
    stats: { impressions: 4510, clicks: 297, ctr: '6.6%', avgPosition: '2.9' },
    quote: "We zien nu wekelijks nieuwe gezichten in de winkel die ons via Google hebben gevonden.",
    author: 'Olivier & Kelly',
    role: 'Eigenaren',
  },
  {
    id: 'itransform',
    title: 'praktijk-itransform.be',
    website: 'https://praktijk-itransform.be',
    location: 'Brugge',
    chartData: [
      { name: 'Voor advies', views: 180 },
      { name: 'Optimalisatie', views: 420 },
      { name: 'Na webadvies', views: 890 },
    ],
    stats: { impressions: 890, clicks: 78, ctr: '8.8%', avgPosition: '6.1' },
    quote: "Geen ingewikkeld technisch jargon, maar heldere taal en resultaat.",
    author: 'Praktijk iTransform',
    role: 'Therapeut',
  },
];

const Proof: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const currentCase = caseStudies[activeIndex];

  return (
    <section className={styles.section} id="resultaten">
      <div className={`${styles.container} animate-on-scroll`}>
        <div className={`${styles.header} reveal-up`}>
          <span className={styles.badge}>Case Studies</span>
          <h2 className={styles.title}>Resultaten spreken<br/>voor zich.</h2>
          <p className={styles.description}>
            Cijfers uit Google Search Console van echte projecten.
          </p>
        </div>

        <div className={`${styles.selector} reveal-up`}>
          {caseStudies.map((caseItem, index) => (
            <button
              key={caseItem.id}
              onClick={() => setActiveIndex(index)}
              className={`${styles.selectorBtn} ${index === activeIndex ? styles.selectorBtnActive : ''}`}
            >
              {caseItem.title}
            </button>
          ))}
        </div>

        <div className={`${styles.card} reveal-scale`}>
          <div className={styles.dataPanel}>
            <h3 className={styles.caseTitle}>
              <a href={currentCase.website} target="_blank" rel="noreferrer" className={styles.caseLink}>
                {currentCase.title}
              </a>
            </h3>
            <p className={styles.caseLocation}>{currentCase.location}</p>

            <div className={styles.chartContainer}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={currentCase.chartData}>
                  <CartesianGrid stroke="#EBE8E1" strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#828280' }} />
                  <YAxis hide domain={[0, 'dataMax + 500']} />
                  <Bar dataKey="views" isAnimationActive={false}>
                    {currentCase.chartData.map((_, index) => (
                      <Cell key={index} fill={index === 2 ? '#2B4560' : '#DCD8CF'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className={styles.statsGrid}>
              <div className={styles.statBox}>
                <p className={styles.statLabel}>Impressies</p>
                <p className={styles.statValue}>{currentCase.stats.impressions}</p>
              </div>
              <div className={styles.statBox}>
                <p className={styles.statLabel}>Kliks</p>
                <p className={styles.statValue}>{currentCase.stats.clicks}</p>
              </div>
            </div>
          </div>

          <div className={styles.imagePanel}>
            <div className={styles.imageOverlay}>
              <blockquote className={styles.quoteText}>"{currentCase.quote}"</blockquote>
              <div>
                <p className={styles.quoteAuthor}>{currentCase.author}</p>
                <p className={styles.quoteRole}>{currentCase.role}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Proof;
