import { v4 as uuidv4 } from 'uuid';
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
  ref?:
    | MutableRefObject<HTMLSelectElement>
    | MutableRefObject<HTMLInputElement>
    | MutableRefObject<HTMLTextAreaElement>;
  onChange?: Function;
  center?: boolean;
  defaultValue?: string;
}

const Input = ({
  label,
  className,
  placeholder,
  id,
  typeOfInput,
  options,
  ref,
  onChange,
  center,
  defaultValue
}: InputType) => {
  if (typeOfInput === 'INPUT') {
    return (
      <div
        className={styles.inputContainer}
        style={{ justifyContent: center ? 'center' : 'space-between' }}
      >
        <p className={styles.info}>{label}</p>
        <input
          type='text'
          className={className}
          placeholder={placeholder}
          id={id}
          ref={ref as MutableRefObject<HTMLInputElement>}
          onChange={(e) => (onChange ? onChange(e) : undefined)}
        />
      </div>
    );
  } else if (typeOfInput === 'SELECT') {
    let i = 0;
    return (
      <div
        className={styles.inputContainer}
        style={{ justifyContent: center ? 'center' : 'space-between' }}
      >
        <p className={styles.info}>{label}</p>
        <select
          className={className}
          ref={ref as MutableRefObject<HTMLSelectElement>}
          onChange={(e) => (onChange ? onChange(e) : undefined)}
          value={defaultValue}
        >
          {options &&
            options.map((el) => {
              i++;
              return (
                <option key={uuidv4()} value={el}>
                  {el}
                </option>
              );
            })}
        </select>
      </div>
    );
  } else if (typeOfInput === 'TEXTAREA') {
    return (
      <div
        className={`${styles.inputContainer} ${className}`}
        style={{ justifyContent: center ? 'center' : 'space-between' }}
      >
        <p className={styles.info}>{label}</p>
        <textarea
          placeholder={placeholder}
          id={id}
          ref={ref as MutableRefObject<HTMLTextAreaElement>}
          onChange={(e) => (onChange ? onChange(e) : undefined)}
        />
      </div>
    );
  } else {
    return <div>lol</div>;
  }
};

export default Input;
