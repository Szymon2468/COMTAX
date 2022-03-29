import { url } from 'inspector';
import styles from './Tile.module.scss';

type DIRECTION = 'RIGHT' | 'LEFT';
type BG_COLOR = 'GREEN' | 'BLUE';

interface TileType {
  direction: DIRECTION;
  bgColor: BG_COLOR;
  imgText: String;
  text: String;
  imgUrl: string;
}

function Tile({ direction, bgColor, imgText, text, imgUrl }: TileType) {
  let bgclr = '';
  if (bgColor === 'BLUE') {
    bgclr = styles.blueBgColor;
  } else if (bgColor === 'GREEN') {
    bgclr = styles.greenBgColor;
  }

  let borderRadius = '';
  if (direction === 'LEFT') {
    borderRadius = styles.rightBorderRadius;
  } else if (direction === 'RIGHT') {
    borderRadius = styles.leftBorderRadius;
  }

  return (
    <div className={styles.tile}>
      {direction === 'LEFT' && (
        <div style={{ backgroundImage: imgUrl }} className={styles.leftImg}>
          <p>{imgText}</p>
        </div>
      )}
      <div className={`${styles.content} ${bgclr} ${borderRadius}`}>
        <p className={styles.text}>{text}</p>
      </div>
      {direction === 'RIGHT' && (
        <div style={{ backgroundImage: imgUrl }} className={styles.rightImg}>
          <p>{imgText}</p>
        </div>
      )}
    </div>
  );
}

export default Tile;
