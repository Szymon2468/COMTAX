import styles from './Gallery.module.scss';
import { v4 as uuidv4 } from 'uuid';
// @ts-ignore
import ModalImage from 'react-modal-image';

export interface IImage {
  url: string;
  title: string;
}

interface IGalleryProps {
  images: IImage[];
}

const Gallery = ({ images }: IGalleryProps) => {
  const result: JSX.Element[] = [];
  images.map((el) => {
    result.push(
      <div key={uuidv4()} className={styles.galleryImg}>
        <ModalImage
          small={el.url}
          large={el.url}
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
