import styles from './OfferTile.module.scss';
import Button from '../Button/Button';

type BUTTON_TYPE = 'FULL' | 'OUTLINED';
type BUTTON_COLOR = 'GREEN' | 'BLUE' | 'TRANSPARENT';

type BACKGROUND_COLOR = 'GREEN' | 'BLUE';

interface OfferTileType {
  bgColor: BACKGROUND_COLOR;
  title: String;
  text: String;
  imgUrl?: String;
  btnText: String;
  btnOnClick: Function;
  btnColor: BUTTON_COLOR;
  btnType: BUTTON_TYPE;
}

function OfferTileLeft({
  title,
  text,
  imgUrl,
  btnText,
  btnOnClick,
  btnColor,
  btnType
}: OfferTileType) {
  return (
    <section className={styles.offerTileContainer}>
      <div className={styles.offerTile}>
        <header>
          <h2 className={styles.title}>{title}</h2>
        </header>
        <main>
          <p className={styles.text}>{text}</p>
          <Button
            text={btnText}
            onClick={() => btnOnClick()}
            color={btnColor}
            type={btnType}
          ></Button>
        </main>
      </div>
      <div className={styles.img}></div>
    </section>
  );
}

export default OfferTileLeft;
