import React from 'react';
import styles from './Logo.module.css';

/** Decorative inside a link with an accessible Webaanzee label. */
const Logo: React.FC = () => (
  <span className={styles.logo} aria-hidden="true">
    <img className={styles.light} src="/wordmark.png" width="1823" height="220" alt="" decoding="async" />
    <img className={styles.dark} src="/wordmark-dark.png" width="1823" height="220" alt="" decoding="async" />
  </span>
);

export default Logo;
