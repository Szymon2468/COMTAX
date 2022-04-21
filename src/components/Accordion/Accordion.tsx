import { faqs } from '../../configs/faqs';
import { v4 as uuidv4 } from 'uuid';
import AccordionItem from './AccordionItem/AccordionItem';
import styles from './Accordion.module.scss';
import photo1 from '../../assets/accountspage/Photo1.jpg';
import photo2 from '../../assets/accountspage/Photo2.jpg';
import photo3 from '../../assets/accountspage/Photo3.jpg';
import photo4 from '../../assets/accountspage/Photo4.jpg';
import photo5 from '../../assets/accountspage/Photo5.jpg';
import photo6 from '../../assets/accountspage/Photo6.jpg';
import photo7 from '../../assets/accountspage/Photo7.jpg';

const Accordion = () => {
  const images = [photo1, photo2, photo3, photo4, photo5, photo6, photo7];
  return (
    <ul className={styles.accordion}>
      {faqs.map((faq, index) => (
        <AccordionItem key={uuidv4()} faq={faq} img={images[index]} />
      ))}
    </ul>
  );
};

export default Accordion;
