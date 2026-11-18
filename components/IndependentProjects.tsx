import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { independentProjectPreviews } from '../data/independent-projects.mjs';
import styles from './IndependentProjects.module.css';

export default function IndependentProjects() {
  return <section id="eigen-projecten" className={styles.section} aria-labelledby="independent-title">
    <div className={styles.inner}>
      <div className={styles.intro}>
        <h2 id="independent-title">Wat ik<br /><span>daarnaast bouw.</span></h2>
        <p>Naast websites ontwikkel ik eigen software. PWAYMENT verbindt kassa, voorraad en klantbeheer. Velvet is een complete DAW. Met Sunline werk ik aan 3D-simulatie en multiplayerarchitectuur.</p>
      </div>
      <div className={styles.projects}>
        {independentProjectPreviews.map(project => <article key={project.slug} className={styles.project}>
          <div className={styles.copy}>
            <h3>{project.title}</h3>
            <p className={styles.headline}>{project.headline}</p>
            <p className={styles.summary}>{project.summary}</p>
            <p className={styles.status}>{project.status}</p>
            <a className={styles.link} href={project.path}>Bekijk {project.title}<ArrowUpRight size={20} aria-hidden="true" /></a>
          </div>
          <a className={`${styles.visual} ${styles[project.slug]}`} href={project.path} aria-label={`Bekijk het eigen project ${project.title}`}>
            <img src={project.hero.src} srcSet={project.hero.srcSet} sizes="(max-width: 760px) calc(100vw - 40px), (max-width: 1100px) 62vw, 800px" width={project.hero.width} height={project.hero.height} alt={project.hero.alt} loading="lazy" decoding="async" />
          </a>
        </article>)}
      </div>
    </div>
  </section>;
}
