import React from 'react';
import styles from './ProblemSolution.module.css';

const ProblemSolution: React.FC = () => (
  <section className={styles.section} id="werkwijze">
    <div className={styles.container}>
      <div className={styles.positioning}>
        <div>
          <p className={styles.eyebrow}>Goed werk verdient een goede eerste indruk.</p>
          <h2>Mensen vergelijken sneller dan ooit.</h2>
        </div>
        <div className={styles.positioningText}>
          <p>Nog voor ze bellen, langskomen of een offerte vragen, hebben ze je website al bekeken.</p>
          <p>Daarom moet die niet alleen mooi zijn. Hij moet in een paar seconden duidelijk maken:</p>
          <p className={styles.statements}>dit is wie we zijn.<br />dit is wat we doen.<br />en hier zit je goed.</p>
          <p>Webaanzee bouwt websites die precies dat doen.</p>
        </div>
      </div>

      <div className={styles.better}>
        <div>
          <p className={styles.eyebrow}>Wat ik doe</p>
          <h2>Niet méér website.<br /><em>Een betere.</em></h2>
        </div>
        <div className={styles.betterText}>
          <p>Ik ontwerp en bouw websites rond wat jouw zaak nodig heeft.</p>
          <p>Soms is dat een sterke, heldere website waarmee je eindelijk professioneel voor de dag komt.</p>
          <p>Soms moet een website meer doen: aanvragen verzamelen, afspraken binnenhalen, verkopen of werk uit handen nemen.</p>
          <p>Geen standaardpakket omdat het toevallig makkelijk verkoopt.</p>
          <p>Eerst bepalen we wat de website moet bereiken. Daarna bouwen we precies genoeg om dat goed te doen.</p>
        </div>
      </div>
    </div>
  </section>
);

export default ProblemSolution;
