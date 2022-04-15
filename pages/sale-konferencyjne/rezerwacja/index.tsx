import styles from './index.module.scss';
import RoomTile from './RoomTile/RoomTile';
import img from './Background.jpg';
import { rooms } from '../../../src/configs/rooms';
import Link from 'next/link';

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
            <Link key={el.id} href={`rezerwacja/${el.id}`}>
              <a>
                <RoomTile
                  img={el.imgUrl}
                  alt={el.imgAlt}
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

export default index;
