import styles from './index.module.scss';
import RoomTile from './RoomTile/RoomTile';
import img from './Background.jpg';
import Link from 'next/link';
import { rooms } from '../../../src/configs/rooms';

function index() {
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
            <Link
              key={`room-${el.id}`}
              href={`/sale-konferencyjne-zarezerwuj/${'id'}`}
            >
              <RoomTile
                img={el.imgUrl}
                alt={el.imgAlt}
                name={el.name}
                price={40}
                date={'04.05.2022'}
                startHour='12.00'
                endHour='14.00'
              ></RoomTile>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default index;
