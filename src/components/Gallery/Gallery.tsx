import styles from './Gallery.module.scss';
import ModalImage from 'react-modal-image';

export interface IImage {
  url: string;
  title?: string;
}

interface IGalleryProps {
  images: IImage[];
}

const Gallery = ({ images }: IGalleryProps) => {
  const result: JSX.Element[] = [];
  images.map((el) => {
    result.push(
      <div className={styles.galleryImg}>
        <ModalImage
          small={el.url}
          large={el.url}
          alt='Hello World!'
          imageBackgroundColor={'transparent'}
          hideDownload={true}
        />
      </div>
    );
  });

  return <>{result}</>;
};

export default Gallery;
