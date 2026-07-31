import styles from './Button.module.css';



interface ButtonProps {
  text?: string;
  icon?: string;
  onClick?: () => void;
  disabled?: boolean;
};

const Button = ({ text, icon, onClick, disabled }: ButtonProps) => {

  return (
    <button className={styles.button} type='button' onClick={onClick} disabled={disabled}>
      {icon && (
        <span className={styles.iconWrapper}>{icon}</span>
      )}
      {text && (
        <span className={styles.textWrapper}>{text}</span>
      )}
    </button>
  );
};

export default Button;