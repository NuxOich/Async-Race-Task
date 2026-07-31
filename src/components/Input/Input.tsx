import styles from './Input.module.css';


interface InputProps {
  type: React.InputHTMLAttributes<HTMLInputElement>['type'];
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({ type, placeholder, value, onChange }: InputProps) => {

  return (
    <input
      className={styles.text}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export default Input;
