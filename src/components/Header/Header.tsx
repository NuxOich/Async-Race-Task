import styles from './Header.module.css';
import { NavLink } from 'react-router-dom';

const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
  isActive ? styles.navLinkActive : styles.navLink;

const Header = () => (
  <header className={styles.headerWrapper}>
    <div className={styles.logo}>
      <img src="#" alt="Logo" />
    </div>
    <div>
      <NavLink to="/" className={getNavLinkClass}>
        Garage
      </NavLink>
      <NavLink to="/winners" className={getNavLinkClass}>
        Winners
      </NavLink>
    </div>
  </header>
);

export default Header;
