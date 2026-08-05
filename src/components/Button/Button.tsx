import styles from './Button.module.css';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface ButtonProps {
  text?: string;
  icon?: IconDefinition;
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'default' | 'danger' | 'primary' | 'compact' | 'close';
  size?: 'normal' | 'compact';
}

const Button = ({ text, icon, onClick, disabled, variant = 'default', size = 'normal' }: ButtonProps) => (
  <button
    className={`${styles.button} ${styles[variant]} ${size === 'compact' ? styles.compact : ''}`}
    type="button"
    onClick={onClick}
    disabled={disabled}
  >
    {icon && <span className={styles.iconWrapper}><FontAwesomeIcon icon={icon} /></span>}
    {text && <span className={styles.textWrapper}>{text}</span>}
  </button>
);

export default Button;
