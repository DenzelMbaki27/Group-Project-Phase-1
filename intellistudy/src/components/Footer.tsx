import styles from '../styles/Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      &copy; {new Date().getFullYear()} IntelliStudy. All rights reserved.
    </footer>
  );
};

export default Footer;
