import { MutableRefObject, useState } from 'react';
import { useRef } from 'react';
import styles from '../Accordion.module.scss';
import { IoIosArrowDown } from 'react-icons/io';
import { IoIosArrowUp } from 'react-icons/io';

interface IAccordionItemProps {
  faq: {
    question: string;
    answer: JSX.Element;
  };
  img: StaticImageData;
}

const AccordionItem = ({ faq, img }: IAccordionItemProps) => {
  const [clicked, setClicked] = useState(false);
  const contentEl = useRef() as MutableRefObject<HTMLInputElement>;

  const { question, answer } = faq;

  const handleToggle = () => {
    setClicked((prev) => !prev);
  };

  return (
    <li className={`${styles.accordionItem} ${clicked ? styles.active : ''}`}>
      <button
        className={styles.button}
        onClick={handleToggle}
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.527),rgba(0, 0, 0, 0.5)) , url(${img.src})`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover'
        }}
      >
        {question}
        <span className={styles.control}>
          {clicked ? <IoIosArrowUp /> : <IoIosArrowDown />}{' '}
        </span>
      </button>

      <div
        ref={contentEl}
        className={styles.answerWrapper}
        style={
          clicked
            ? { height: contentEl.current.scrollHeight }
            : { height: '0px' }
        }
      >
        <div className={styles.answer}>{answer}</div>
      </div>
    </li>
  );
};

export default AccordionItem;
