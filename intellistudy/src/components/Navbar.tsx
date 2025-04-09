import Link from 'next/link';
import styles from '../styles/Navbar.module.css';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>IntelliStudy</div>
      <div className={styles.links}>
        <Link href="/" className={styles.link}>Home</Link>
        <Link href="/study" className={styles.link}>Study</Link>
        <Link href="/flashcards" className={styles.link}>Flashcards</Link>
        <Link href="/qa" className={styles.link}>Q&A Bot</Link>
      </div>
    </nav>
  );
};

export default Navbar;
