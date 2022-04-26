import styles from './index.module.scss';
import RoomTile from './RoomTile/RoomTile';
import { v4 as uuidv4 } from 'uuid';
import Link from 'next/link';
import { HTTPRequest } from '../../../src/lib/httpRequest';

interface IPhoto {
  url: string;
  alt: string;
}

export interface IRoom {
  _id: string;
  name: string;
  address: string;
  city: string;
  facilities: string[];
  photos: IPhoto[];
}

export interface IRoomTile {
  rooms: IRoom[];
}

function index({ rooms }: IRoomTile) {
  // console.log(rooms);
  return (
    <>
      <section>
        <div className={styles.landingPage}>
          <div className={`container ${styles.accountsContainer}`}>
            <header>
              <h1 className={styles.title}>ZAREZERWUJ SALĘ KONFERENCYJNĄ</h1>
            </header>
          </div>
        </div>
      </section>

      <div className={`container ${styles.roomTilesContainerContainer}`}>
        <header className={styles.header}>
          <h2 className={styles.title}>
            PRZEGLĄDAJ SALE KONFERENCYJCE, JAKIE MAMY W OFERCIE
          </h2>
        </header>
        <div className={styles.roomTilesContainer}>
          {rooms.map((el) => (
            <Link key={uuidv4()} href={`rezerwacja/${el._id}`}>
              <a>
                <RoomTile
                  img={el.photos[0]?.url}
                  alt={el.photos[0]?.alt}
                  name={el.name}
                ></RoomTile>
              </a>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const response = await HTTPRequest('GET', '/conference-rooms');

  return {
    props: { rooms: response.data || {} },
    revalidate: 3600
  };
}

export default index;
