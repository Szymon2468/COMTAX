import styles from './OfferTile.module.scss';
import Button from '../Button/Button';
import Link from 'next/link';

type BUTTON_TYPE = 'FULL' | 'OUTLINED';
type BUTTON_COLOR = 'GREEN' | 'BLUE' | 'TRANSPARENT';

type BACKGROUND_COLOR = 'GREEN' | 'BLUE';

interface OfferTileType {
  bgColor: BACKGROUND_COLOR;
  title: String;
  text: String;
  imgUrl: string;
  btnText: String;
  btnOnClick: Function;
  btnColor: BUTTON_COLOR;
  btnType: BUTTON_TYPE;
}

function OfferTileRight({
  title,
  text,
  imgUrl,
  btnText,
  btnOnClick,
  btnColor,
  btnType,
  bgColor
}: OfferTileType) {
  let bgclr = '';
  if (bgColor === 'BLUE') {
    bgclr = styles.offerTileBlue;
  } else {
    bgclr = styles.offerTileGreen;
  }
  return (
    <section className={styles.offerTileContainer}>
      <div className={`${styles.offerTile} ${bgclr}`}>
        <header>
          <h2 className={styles.title}>{title}</h2>
        </header>
        <main className={styles.tileRight}>
          <p className={styles.textRight}>{text}</p>
          <div className={styles.btnContainer}>
            <Button
              className={styles.btn}
              text={btnText}
              onClick={() => btnOnClick()}
              color={btnColor}
              type={btnType}
            ></Button>
          </div>
        </main>
      </div>
      <img
        className={`${styles.img} ${styles.imgRight}`}
        src={imgUrl}
        alt='idk'
      ></img>
    </section>
  );
}

export default OfferTileRight;
