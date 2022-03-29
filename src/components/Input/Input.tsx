import { platform } from 'os';
import styles from './Input.module.scss';

type TypeOfInput = 'INPUT' | 'TEXTAREA' | 'SELECT';

interface InputType {
  label: string;
  className?: string;
  placeholder?: string;
  id?: string;
  typeOfInput: TypeOfInput;
  options?: string[];
}

const Input = ({
  label,
  className,
  placeholder,
  id,
  typeOfInput,
  options
}: InputType) => {
  if (typeOfInput === 'INPUT') {
    return (
      <div className={styles.inputContainer}>
        <p className={styles.info}>{label}</p>
        <input
          type='text'
          className={className}
          placeholder={placeholder}
          id={id}
        />
      </div>
    );
  } else if (typeOfInput === 'SELECT') {
    return (
      <div className={styles.inputContainer}>
        <select>
          {options && options.map((el) => <option value={el}>{el}</option>)}
        </select>
      </div>
    );
  } else if (typeOfInput === 'TEXTAREA') {
    return (
      <div className={styles.inputContainer}>
        <p className={`info ${className}`}>{label}</p>
        <textarea placeholder={placeholder} id={id} />
      </div>
    );
  } else {
    return <div>lol</div>;
  }
};

export default Input;