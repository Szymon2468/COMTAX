import { url } from 'inspector';
import styles from './Tile.module.scss';
import { IoIosArrowDown } from 'react-icons/io';
import { useState } from 'react';

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
  const [isDown, setIsDown] = useState(false);

  const slideDown = (id: string) => {
    const el: HTMLElement | null = document.getElementById(id);
    (el as HTMLElement).style.transition = 'linear 0.3s all';
    (el as HTMLElement).style.height = 'auto';
    setIsDown(true);
  };

  const slideUp = (id: string) => {
    const el: HTMLElement | null = document.getElementById(id);
    (el as HTMLElement).style.transition = 'linear 0.3s all';
    (el as HTMLElement).style.height = '0';
    setIsDown(false);
  };

  const slide = (id: string) => {
    if (isDown) {
      slideUp(id);
    } else {
      slideDown(id);
    }
  };

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
        <div className={styles.leftImg}>
          <img src={imgUrl} />
          <p onClick={() => slide('imgText')}>{imgText}</p>
          <div
            onClick={() => slide('imgText')}
            className={styles.arrowContainer}
          >
            <IoIosArrowDown />
          </div>
        </div>
      )}
      <div
        id='imgText'
        className={`${styles.content} ${bgclr} ${borderRadius}`}
      >
        <p className={styles.text}>{text}</p>
      </div>
      {direction === 'RIGHT' && (
        <div className={styles.rightImg}>
          <img src={imgUrl} />
          <p onClick={() => slide('imgText')}>{imgText}</p>
          <div
            className={styles.arrowContainer}
            onClick={() => slide('imgText')}
          >
            <IoIosArrowDown />
          </div>
        </div>
      )}
    </div>
  );
}

export default Tile;
