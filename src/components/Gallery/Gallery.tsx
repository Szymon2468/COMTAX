import styles from './Gallery.module.scss';
import { v4 as uuidv4 } from 'uuid';
// @ts-ignore
import ModalImage from 'react-modal-image';
import Image from 'next/image';

interface IImageObject {
  blurDataURL: string;
  src: string;
  width: number;
  height: number;
}

interface IGalleryProps {
  images: IImageObject[];
}

const Gallery = ({ images }: IGalleryProps) => {
  const result: JSX.Element[] = [];
  images.map((el) => {
    console.log(el.src);
    result.push(
      <div key={uuidv4()} className={styles.galleryImg}>
        {/* <Image alt='lol' width={200} height={200} src={el.src} /> */}
        <ModalImage
          small={el.src}
          large={el.src}
          alt=''
          imageBackgroundColor={'transparent'}
          hideDownload={true}
        />
      </div>
    );
  });

  return <div className={styles.galleryContainer}>{result}</div>;
};

export default Gallery;
