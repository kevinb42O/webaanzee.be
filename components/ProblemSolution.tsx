import React from 'react';
import { motion } from 'motion/react';
import { X, Check } from 'lucide-react';
import styles from './ProblemSolution.module.css';

const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut" } 
  }
};

const listVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -15 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } }
};

const ProblemSolution: React.FC = () => {
  return (
    <section className={styles.section} id="werkwijze">
      <div className={styles.container}>
        
        <motion.div 
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className={styles.title}>
            Waarom geen traditioneel bureau?
          </h2>
        </motion.div>

        <motion.div 
          className={styles.cardsGrid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          
          {/* Traditioneel Bureau Card */}
          <div className={styles.cardNegative}>
            <h3 className={styles.cardTitleNegative}>Traditioneel Bureau</h3>
            <ul className={styles.list}>
              <li className={styles.listItem}>
                <X size={18} strokeWidth={2} className={styles.iconNegative} />
                <span>Maandenlange doorlooptijden met eindeloze feedbackrondes</span>
              </li>
              <li className={styles.listItem}>
                <X size={18} strokeWidth={2} className={styles.iconNegative} />
                <span>Je praat met accountmanagers; een junior bouwt je site</span>
              </li>
              <li className={styles.listItem}>
                <X size={18} strokeWidth={2} className={styles.iconNegative} />
                <span>Je betaalt mee aan hun dure kantoorpand en overhead</span>
              </li>
              <li className={styles.listItem}>
                <X size={18} strokeWidth={2} className={styles.iconNegative} />
                <span>Trage sites gebouwd met verouderde tech-stacks</span>
              </li>
              <li className={styles.listItem}>
                <X size={18} strokeWidth={2} className={styles.iconNegative} />
                <span>Matige SEO en laadtijden die conversie nekken</span>
              </li>
              <li className={styles.listItem}>
                <X size={18} strokeWidth={2} className={styles.iconNegative} />
                <span>Totaal onleesbaar voor AI-agents en LLM's</span>
              </li>
            </ul>
          </div>

          {/* WebAanZee Card */}
          <div className={styles.cardPositive}>
            <h3 className={styles.cardTitlePositive}>WebAanZee</h3>
            
            <motion.ul 
              className={styles.list}
              variants={listVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.li variants={itemVariants} className={`${styles.listItem} ${styles.listItemActive}`}>
                <Check size={18} strokeWidth={2.5} className={styles.iconPositive} />
                <span>Live in weken door directe executie en focus</span>
              </motion.li>
              <motion.li variants={itemVariants} className={`${styles.listItem} ${styles.listItemActive}`}>
                <Check size={18} strokeWidth={2.5} className={styles.iconPositive} />
                <span>1-op-1 direct contact met de expert die alles bouwt</span>
              </motion.li>
              <motion.li variants={itemVariants} className={`${styles.listItem} ${styles.listItemActive}`}>
                <Check size={18} strokeWidth={2.5} className={styles.iconPositive} />
                <span>100% van je budget gaat naar de kwaliteit van je platform</span>
              </motion.li>
              <motion.li variants={itemVariants} className={`${styles.listItem} ${styles.listItemActive}`}>
                <Check size={18} strokeWidth={2.5} className={styles.iconPositive} />
                <span>Gegarandeerd 100/100 op Prestaties, SEO & Toegankelijkheid</span>
              </motion.li>
              <motion.li variants={itemVariants} className={`${styles.listItem} ${styles.listItemActive}`}>
                <Check size={18} strokeWidth={2.5} className={styles.iconPositive} />
                <span>Volledig AI-ready (geoptimaliseerd voor Agentisch Browsen)</span>
              </motion.li>
              <motion.li variants={itemVariants} className={`${styles.listItem} ${styles.listItemActive}`}>
                <Check size={18} strokeWidth={2.5} className={styles.iconPositive} />
                <span>Razendsnel maatwerk dat klaar is voor het nieuwe internet</span>
              </motion.li>
            </motion.ul>
          </div>

        </motion.div>

      </div>
    </section>
  );
};

export default ProblemSolution;
