import React from 'react';
import PortfolioDepth from './PortfolioDepth';
import styles from './Proof.module.css';
import { projects } from '../data/projects.mjs';

export interface CaseStudy {
  id: string;
  title: string;
  description: string;
  website: string;
  casePath: string;
  videoSrc: string;
  imageSrc: string;
  previewSrc?: string;
  showInGrid?: boolean;
  tags: string[];

}

export const caseStudies: CaseStudy[] = projects.map(project => ({
  id: project.id,
  title: project.title,
  description: project.summary,
  website: project.url,
  casePath: project.casePath,
  videoSrc: project.videoSrc,
  imageSrc: project.image,
  previewSrc: project.previewSrc,
  showInGrid: project.showInGrid,
  tags: project.tags,
}));

const Proof: React.FC = () => (
  <section className={styles.section} aria-label="Webaanzee en ons werk">
    <PortfolioDepth projects={caseStudies} />
  </section>
);

export default Proof;
