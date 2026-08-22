import React from 'react';
import styles from './Quality.module.css';

const Quality: React.FC = () => (
  <section className={styles.section}>
    <div className={styles.container}>
      <p className={styles.eyebrow}>Kwaliteit</p>
      <div className={styles.grid}>
        <h2 className={styles.title}>Mooi is de ondergrens.</h2>
        <div className={styles.content}>
          <p>Een website kan er uitstekend uitzien en alsnog weinig doen.</p>
          <p>Daarom kijk ik verder dan kleur, lettertype en animatie.</p>
          <ul>
            <li>De structuur moet kloppen.</li>
            <li>De tekst moet helder zijn.</li>
            <li>De mobiele versie moet net zo sterk voelen.</li>
            <li>De website moet snel zijn.</li>
            <li>Iedere belangrijke actie moet logisch voelen.</li>
          </ul>
          <p>Het resultaat moet niet alleen indruk maken in een screenshot.</p>
          <p className={styles.closing}>Het moet werken wanneer echte mensen hem gebruiken.</p>
        </div>
      </div>
    </div>
  </section>
);

export default Quality;
