import styles from './index.module.scss';
import RoomTile from './RoomTile/RoomTile';
import { v4 as uuidv4 } from 'uuid';
import Link from 'next/link';
import dbConnect from '../../../app/lib/dbConnect';
import MasterLayout from '../../../src/components/MasterLayout/MasterLayout';
import { NextSeo } from 'next-seo';

const ConferenceRoom = require('../../../app/models/ConferenceRoom');

interface IImageObject {
  blurDataURL: string;
  src: string;
  width: number;
  height: number;
}

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
  roomImg: IImageObject;
}

export interface IRoomTile {
  rooms: IRoom[];
}

function index({ rooms }: IRoomTile) {
  console.log(rooms);

  return (
    <>
      <NextSeo
        title='Sala Konferencyjna w Katowicach - rezerwacja'
        description='Szukasz w Katowicach miejsca na spotkanie z Klientem lub partnerem biznesowym? Zarezerwuj jedną z naszych sal - krasińskiego 29, Katowice'
        canonical='https://krasinskiego29.pl/sale-konferencyjne/rezerwacja'
      />

      <MasterLayout>
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
                    img={el.roomImg.src}
                    alt={el.photos[0]?.alt}
                    name={el.name}
                  ></RoomTile>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </MasterLayout>
    </>
  );
}

export async function getStaticProps() {
  await dbConnect();
  const response = await ConferenceRoom.find({});

  const data = JSON.parse(JSON.stringify(response));
  await data.map(async (el: any) => {
    el.roomImg = (
      await import(`../../../public/rooms/${el.name.toUpperCase()}/photo1.jpeg`)
    ).default;
  });

  return {
    props: { rooms: data || {} },
    revalidate: 3600
  };
}

export default index;
