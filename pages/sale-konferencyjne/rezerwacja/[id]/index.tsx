import styles from './index.module.scss';
import Gallery, { IImage } from '../../../../src/components/Gallery/Gallery';
import BackgroundImage from '../../../sale-konferencyjne/Background.jpg';
import HighliteDates from '../../../../src/components/HighlightDates/HighliteDates';
import Input from '../../../../src/components/Input/Input';
import { rooms } from '../../../../src/configs/rooms';
import { MutableRefObject, useRef, useState } from 'react';

function index() {
  const roomId = 0;
  const [endHours, setEndHours] = useState([]);
  const inputEndRef = useRef() as MutableRefObject<HTMLSelectElement>;
  const inputStartRef = useRef() as MutableRefObject<HTMLSelectElement>;
  const images: IImage[] = [
    {
      url: BackgroundImage.src,
      title: 'a'
    },
    {
      url: BackgroundImage.src,
      title: 'ab'
    },
    {
      url: BackgroundImage.src,
      title: 'ac'
    },
    {
      url: BackgroundImage.src,
      title: 'ad'
    },
    {
      url: BackgroundImage.src,
      title: 'a'
    },
    {
      url: BackgroundImage.src,
      title: 'ab'
    },
    {
      url: BackgroundImage.src,
      title: 'ac'
    },
    {
      url: BackgroundImage.src,
      title: 'ad'
    }
  ];

  const availableStartHours = [
    '8:00',
    '8:30',
    '9:00',
    '9:30',
    '10:00',
    '10:30',
    '11:00',
    '11:30',
    '12:00',
    '12:30',
    '13:00',
    '13:30',
    '14:00',
    '14:30',
    '15:00',
    '15:30',
    '16:00',
    '16:30',
    '17:00',
    '17:30'
  ];

  const availableEndHours = [
    '8:30',
    '9:00',
    '9:30',
    '10:00',
    '10:30',
    '11:00',
    '11:30',
    '12:00',
    '12:30',
    '13:00',
    '13:30',
    '14:00',
    '14:30',
    '15:00',
    '15:30',
    '16:00',
    '16:30',
    '17:00',
    '17:30',
    '18:00'
  ];

  interface IReservationDateType {
    startHour: string;
    endHour: string;
  }

  const generateAvailableStartHoursArrayForChosenDay = (day: Date) => {
    let startHours = availableStartHours;
    let excludedHours: IReservationDateType[] = [];

    const roomReservations = rooms.find((el) => roomId === el.id);
    const reservationsForDay = roomReservations?.reservationDays.find((el) => {
      el.date.setUTCHours(0, 0, 0, 0);
      day.setUTCHours(0, 0, 0, 0);
      return el.date.toString() === day.toString();
    });

    reservationsForDay?.reservations.map((el) =>
      excludedHours.push({
        startHour: el.startHour,
        endHour: el.endHour
      })
    );

    console.log(excludedHours);

    for (let i = 0; i < excludedHours.length; i++) {
      const startIndex = startHours.findIndex(
        (el) => excludedHours[i].startHour === el
      );

      const endIndex = startHours.findIndex(
        (el) => excludedHours[i].endHour === el
      );

      const nrOfRemovedHours = endIndex - startIndex + 2;

      startHours.splice(startIndex - 1, nrOfRemovedHours);
    }

    return startHours;
  };

  const generateAvailableEndHoursArrayForChosenDay = (
    day: Date,
    startHour: string
  ) => {
    let endHours = availableEndHours;
    let excludedHours: IReservationDateType[] = [];

    rooms
      .find((el) => roomId === el.id)
      ?.reservationDays.find((el) => {
        el.date.setUTCHours(0, 0, 0, 0);
        day.setUTCHours(0, 0, 0, 0);
        return el.date.toString() === day.toString();
      })
      ?.reservations.map((el) =>
        excludedHours.push({
          startHour: el.startHour,
          endHour: el.endHour
        })
      );

    const startIndex = availableEndHours.findIndex((el) => el === startHour);

    endHours.splice(0, startIndex + 1);

    if (excludedHours.length > 0) {
      let minIndex: number = availableEndHours.length;
      for (let i = 0; i < excludedHours.length; i++) {
        if (
          availableEndHours.findIndex((el) => startHour === el) <
            availableEndHours.findIndex(
              (el) => excludedHours[i].startHour === el
            ) &&
          i < minIndex
        ) {
          minIndex = i;
        }
      }
      endHours.splice(minIndex - 1);
    }
    return endHours;
  };

  return (
    <>
      <div className='container'>
        <h1 className={styles.title}>SALA KONFERENCYJNA NR 1</h1>
        <h2 className={styles.listTitle}>Informacje o sali: </h2>
        <div className={styles.infoContainer}>
          <ul className={styles.infoList}>
            <li className={styles.info}>Sala posiada klimatyzację</li>
            <li className={styles.info}>Sala posiada klimatyzację</li>
            <li className={styles.info}>Sala posiada klimatyzację</li>
            <li className={styles.info}>Sala posiada klimatyzację</li>
            <li className={styles.info}>Sala posiada klimatyzację</li>
          </ul>
        </div>

        <div className='section'>
          <section className={styles.gallery}>
            <h2>Przeglądaj zdjęcia z tej sali</h2>
            <Gallery images={images} />
          </section>
        </div>

        <section>
          <header className={styles.header}>
            <h2 className={styles.title}>ZAREZERWYJ SALĘ JUZ TERAZ</h2>
          </header>
          <div className={styles.calendarContainer}>
            <p>Wybierz datę rezerwacji: </p>
            <HighliteDates />
          </div>
          <div className={styles.choosingHours}>
            Zarezerwuj salę od{' '}
            <Input
              ref={inputStartRef}
              typeOfInput='SELECT'
              options={generateAvailableStartHoursArrayForChosenDay(new Date())}
              onChange={(e) => {
                console.log(e.target.value);
                // @ts-ignore
                setEndHours(
                  // @ts-ignore
                  generateAvailableEndHoursArrayForChosenDay(
                    new Date(),
                    e.target.value
                  )
                );
              }}
            />{' '}
            do{' '}
            <Input ref={inputEndRef} typeOfInput='SELECT' options={endHours} />
          </div>
        </section>
      </div>
    </>
  );
}

export default index;