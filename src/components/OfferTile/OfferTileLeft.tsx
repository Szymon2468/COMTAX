import styles from './OfferTile.module.scss';
import Button from '../Button/Button';

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

function OfferTileLeft({
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
      <img
        className={`${styles.img} ${styles.imgLeft}`}
        src={imgUrl}
        alt='idk'
      ></img>
      <div className={`${styles.offerTile} ${bgclr} ${styles.offerTileLeft}`}>
        <header>
          <h2 className={styles.title}>{title}</h2>
        </header>
        <main className={styles.tileLeft}>
          <p className={styles.textLeft}>{text}</p>
          <div className={styles.btnContainer}>
            <Button
              text={btnText}
              onClick={() => btnOnClick()}
              color={btnColor}
              type={btnType}
              className={styles.btn}
            ></Button>
          </div>
        </main>
      </div>
    </section>
  );
}

export default OfferTileLeft;
