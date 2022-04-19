import { platform } from 'os';
import { MutableRefObject } from 'react';
import styles from './Input.module.scss';

type TypeOfInput = 'INPUT' | 'TEXTAREA' | 'SELECT';

interface InputType {
  label?: string;
  className?: string;
  placeholder?: string;
  id?: string;
  typeOfInput: TypeOfInput;
  options?: string[];
  ref?: MutableRefObject<HTMLSelectElement>;
  onChange?: Function;
}

const Input = ({
  label,
  className,
  placeholder,
  id,
  typeOfInput,
  options,
  ref,
  onChange
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
    let i = 0;
    return (
      <div className={styles.inputContainer}>
        <p className={styles.info}>{label}</p>
        <select
          className={className}
          ref={ref}
          onChange={(e) => (onChange ? onChange(e) : undefined)}
        >
          {options &&
            options.map((el) => {
              i++;
              return (
                <option key={`o-${i}`} value={el}>
                  {el}
                </option>
              );
            })}
        </select>
      </div>
    );
  } else if (typeOfInput === 'TEXTAREA') {
    return (
      <div className={`${styles.inputContainer} ${className}`}>
        <p className={styles.info}>{label}</p>
        <textarea placeholder={placeholder} id={id} />
      </div>
    );
  } else {
    return <div>lol</div>;
  }
};

export default Input;
