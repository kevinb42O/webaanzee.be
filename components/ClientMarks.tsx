import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import styles from './ClientMarks.module.css';

interface ClientMark { id: string; name: string; website: string; mark: React.ReactNode; }

const clientMarks: ClientMark[] = [
  { id: 'hondaanzee', name: 'Hond aan Zee', website: 'https://www.hondaanzee.be', mark: <><strong>Hond</strong><em>aan</em><i>Zee</i></> },
  { id: 'fietsaanzee', name: 'Fiets aan Zee', website: 'https://www.fietsaanzee.be', mark: <><strong>Fiets</strong><em>aan</em><i>Zee</i></> },
  { id: 'camperaanzee', name: 'Camper aan Zee', website: 'https://www.camperaanzee.be', mark: <><strong>Camper</strong><em>aan</em><i>Zee</i></> },
  { id: 'kidsaanzee', name: 'Kids aan Zee', website: 'https://www.kidsaanzee.be', mark: <><strong>Kids</strong><em>aan</em><i>Zee</i></> },
  { id: 'fabrice', name: 'Fabrice Goffin', website: 'https://www.fabricegoffin.be', mark: <>Fabrice <span>Goffin</span></> },
  { id: 'carabus', name: 'Carabus Ads', website: 'https://www.carabusads.be', mark: <>carabus<span>ads</span></> },
  { id: 'cozy', name: 'COZY Moments', website: 'https://www.cozy-moments.be', mark: <>COZY <span>moments</span></> },
  { id: 'spaarkaart', name: 'COZY spaarkaart', website: 'https://spaarkaart.cozy-moments.be', mark: <><strong>COZY</strong><span>spaarkaart</span></> },
  { id: 'dailygrind', name: 'Daily Grind', website: 'https://www.daily-grind.be', mark: <>DAILY<br /><span>GRIND</span></> },
  { id: 'vishandel', name: 'De Wulk', website: 'https://www.vishandelolivierenkelly.be', mark: <>DE <span>WULK</span></> },
  { id: 'atelierrembrandt', name: 'Atelier Rembrandt', website: 'https://www.atelierrembrandt.com/', mark: <>ATELIER<br /><span>REMBRANDT</span></> },
  { id: 'pwayment', name: 'PWAYMENT POS', website: '/pwayment.html', mark: <><strong>PWAYMENT</strong><span>POS</span></> },
];

const ClientMarks: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px 0px' });

  return (
    <section ref={sectionRef} className={styles.section} aria-labelledby="client-marks-title">
      <div className={styles.container}>
        <motion.div
          className={styles.intro}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className={styles.eyebrow}>Samenwerkingen</p>
          <h2 id="client-marks-title">Gekozen door ondernemers met ambitie.</h2>
        </motion.div>

        <motion.div
          className={styles.marks}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={{ visible: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } } }}
        >
          {clientMarks.map((client) => (
            <motion.a
              key={client.id}
              href={client.website}
              target="_blank"
              rel="noreferrer"
              aria-label={`Bezoek ${client.name}`}
              className={`${styles.mark} ${styles[client.id]}`}
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.48, ease: [0.16, 1, 0.3, 1] } },
              }}
            >
              <span aria-hidden="true">{client.mark}</span>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ClientMarks;
