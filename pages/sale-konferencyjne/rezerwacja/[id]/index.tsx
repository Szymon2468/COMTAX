import { useEffect, useState } from 'react';
import { IRoom } from '..';
import dbConnect from '../../../../app/lib/dbConnect';
import Gallery, { IImage } from '../../../../src/components/Gallery/Gallery';
import HighliteDates from '../../../../src/components/HighlightDates/HighliteDates';
import MasterLayout from '../../../../src/components/MasterLayout/MasterLayout';
import {
  generateReservatedHoursComponent,
  IConferenceRoomResponse,
  IShortenReservation
} from '../../../../src/configs/roomReservation/roomReservation';
import { HTTPRequest } from '../../../../src/lib/httpRequest';
import styles from './index.module.scss';
import ReservationForm from './subComponents/ReservationForm';
import config from '../../../../ENV_CONFIG.json';
import { NextSeo } from 'next-seo';

const ConferenceRoom = require('../../../../app/models/ConferenceRoom');
const Reservation = require('../../../../app/models/Reservation');

interface IRoomReservationProps {
  reservations: IShortenReservation[];
  conferenceRoom: IConferenceRoomResponse;
}

function RoomReservation({
  reservations,
  conferenceRoom
}: IRoomReservationProps) {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [currentReservations, setCurrentReservations] = useState<
    IShortenReservation[]
  >(reservations || []);

  useEffect(() => {
    const request = async () => {
      const date = new Date(startDate).getTime();
      const reservationResponse = await HTTPRequest(
        'GET',
        `/reservations?conferenceRoom=${conferenceRoom.id}&date=${date}`
      );
      setCurrentReservations(
        JSON.parse(JSON.stringify(reservationResponse.data))
      );
    };
    request();
  }, [startDate]);

  if (!conferenceRoom || !reservations) {
    return null;
  }

  return (
    <>
      <NextSeo nofollow={true} noindex={true} />

      <MasterLayout>
        <div className={styles.landingPage}>
          <div className={`container ${styles.accountsContainer}`}>
            <header>
              <h1 className={styles.landingTitle}>
                <span>SALA KONFERENCYJNA</span>{' '}
                <span>{conferenceRoom.name}</span>
              </h1>
            </header>
          </div>
        </div>
        <div className='container'>
          <section>
            <header className={styles.header}>
              <h2 className={styles.title}>ZAREZERWUJ SAL??</h2>
            </header>
            <div className={styles.formContainersContainer}>
              <div className={styles.calendarContainer}>
                <p>Wybierz dat?? rezerwacji: </p>
                <HighliteDates
                  startDate={startDate}
                  setStartDate={setStartDate}
                />
              </div>
            </div>
            <div className={styles.reservatedHoursContainer}>
              {generateReservatedHoursComponent(currentReservations)}
            </div>

            <ReservationForm
              currentReservations={currentReservations}
              conferenceRoom={conferenceRoom}
              date={startDate}
            />
          </section>

          <div className='section'>
            <section className={styles.gallery}>
              <h2>ZOBACZ NASZ?? SAL??</h2>
            </section>

            <div className={styles.galleryContainer}>
              <Gallery images={conferenceRoom.photos} />
            </div>
          </div>
        </div>
      </MasterLayout>
    </>
  );
}

interface IParams {
  params: { id: string };
}

export async function getStaticPaths() {
  await dbConnect();
  const data = await ConferenceRoom.find({});

  const params: IParams[] = [];
  data.forEach((el: IRoom) => {
    params.push({
      params: {
        id: el._id.toString()
      }
    });
  });

  return {
    paths: params,
    fallback: true // false or 'blocking'
  };
}

export async function getStaticProps({ params: { id } }: IParams) {
  await dbConnect();

  const date = new Date();
  date.setUTCHours(2, 0, 0, 0);

  const reservationResponse = await Reservation.find({
    conferenceRoom: id,
    date: date.getTime()
  });

  const conferenceRoomResponse = await ConferenceRoom.findById(id);

  let images: IImage[] = [];

  for (let i = 1; i <= 6; i++) {
    const source = `${
      config.SITE_URL
    }/rooms/${conferenceRoomResponse.name.toUpperCase()}/photo${i}.jpeg`;
    // const source = await import(
    //   `../../../../public/rooms/${conferenceRoomResponse.name.toUpperCase()}/photo${i}.jpeg`
    // );
    images.push({
      url: source,
      title: ''
    });
  }

  const conferenceRoom: IConferenceRoomResponse = {
    id: conferenceRoomResponse._id.toString(),
    name: conferenceRoomResponse.name,
    photos: images,
    facilities: conferenceRoomResponse.facilities,
    address: conferenceRoomResponse.address,
    city: conferenceRoomResponse.city
  };

  let reservations: IShortenReservation[] = reservationResponse.map(
    (el: IShortenReservation) => {
      return {
        _id: el._id.toString(),
        conferenceRoom: el.conferenceRoom,
        date: el.date,
        startHour: el.startHour,
        endHour: el.endHour
      };
    }
  );

  reservations.sort((a, b) => {
    const aStart = a.startHour.length === 4 ? `0${a.startHour}` : a.startHour;
    const bStart = b.startHour.length === 4 ? `0${b.startHour}` : b.startHour;
    if (aStart < bStart) {
      return -1;
    }
    if (aStart > bStart) {
      return 1;
    }
    return 0;
  });

  return {
    props: {
      reservations: JSON.parse(JSON.stringify(reservations)) || [],
      conferenceRoom: JSON.parse(JSON.stringify(conferenceRoom)) || {}
    },
    revalidate: 3600
  };
}

export default RoomReservation;
