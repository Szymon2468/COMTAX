import styles from './index.module.scss';
import Gallery, { IImage } from '../../../../src/components/Gallery/Gallery';
import BackgroundImage from '../../../sale-konferencyjne/Background.jpg';
import HighliteDates from '../../../../src/components/HighlightDates/HighliteDates';
import Input from '../../../../src/components/Input/Input';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import Button from '../../../../src/components/Button/Button';
import { HTTPRequest } from '../../../../src/lib/httpRequest';
import { IRoom } from '..';
import { v4 as uuidv4 } from 'uuid';
import dbConnect from '../../../../app/lib/dbConnect';
import useWindowSize, { WindowSize } from '../../../../src/hooks/useWindowSize';

const ConferenceRoom = require('../../../../app/models/ConferenceRoom');
const Reservation = require('../../../../app/models/Reservation');

interface IShortenReservation {
  _id: string;
  conferenceRoom: string;
  date: Date;
  startHour: string;
  endHour: string;
}

interface IPhoto {
  url: string;
  alt: string;
}

interface IConferenceRoomResponse {
  id: string;
  name: string;
  photos: IPhoto[];
  facilities: string[];
}

function Index({
  reservations,
  conferenceRoom
}: {
  reservations: IShortenReservation[];
  conferenceRoom: IConferenceRoomResponse;
}) {
  console.log(reservations);
  console.log(conferenceRoom);
  const roomId = 0;
  const [endHours, setEndHours] = useState<string[]>();
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [currentReservations, setCurrentReservations] =
    useState<IShortenReservation[]>(reservations);
  const inputEndRef = useRef() as MutableRefObject<HTMLSelectElement>;
  const inputStartRef = useRef() as MutableRefObject<HTMLSelectElement>;
  const [
    areReservationHoursForChosenDayShowed,
    setAreReservationHoursForChosenDayShowed
  ] = useState(false);

  useEffect(() => {
    const request = async () => {
      const date = new Date(startDate).getTime();
      const reservationResponse = await HTTPRequest(
        'GET',
        `/reservations?conferenceRoom=${conferenceRoom.id}&date=${date}`
      );
    };
    request();
  }, [startDate]);

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
  if (!conferenceRoom || !reservations) {
    return null;
  }

  interface IReservationDateType {
    startHour: string;
    endHour: string;
  }

  const generateAvailableStartHoursArrayForChosenDay = (day: Date) => {
    let startHours = availableStartHours;
    let excludedHours: IReservationDateType[] = [];

    currentReservations.map((el) =>
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

    currentReservations.map((el) =>
      excludedHours.push({
        startHour: el.startHour,
        endHour: el.endHour
      })
    );

    const startIndex = availableEndHours.findIndex((el) => el === startHour);

    endHours.splice(0, startIndex + 1);

    if (excludedHours.length > 0) {
      let minIndex: number = availableEndHours.length + 100;
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
      if (minIndex === availableEndHours.length + 100) {
        return endHours;
      } else {
        const removeIndex = availableEndHours.findIndex(
          (el) => el === excludedHours[minIndex].startHour
        );
        console.log('minIndex: ', removeIndex);
        endHours.splice(removeIndex);
        console.log(endHours);
      }
    }
    return endHours;
  };

  const generateReservatedHoursComponent = (day: Date) => {
    let excludedHours: IReservationDateType[] = [];
    let result: JSX.Element[] = [];

    currentReservations.map((el) =>
      excludedHours.push({
        startHour: el.startHour,
        endHour: el.endHour
      })
    );

    if (!excludedHours.length) {
      return result;
    }
    result.push(<h3>Ta sala w tym dniu jest zarezerwowana w godzinach:</h3>);
    excludedHours.map((el) =>
      result.push(
        <p>
          {el.startHour} - {el.endHour}
        </p>
      )
    );
    return result;
  };

  const [namePlaceholder, setNamePlaceholder] = useState('');
  const [surrnamePlaceholder, setSurrnamePlaceholder] = useState('');
  const [emailPlaceholder, setEmailPlaceholder] = useState('');
  const [phonePlaceholder, setPhonePlaceholder] = useState('');
  const [msgPlaceholder, setMsgPlaceholder] = useState('');
  const [companyPlaceholder, setCompanyPlaceholder] = useState('');
  const [streetPlaceholder, setStreetPlaceholder] = useState('');
  const [ZIPcodePlaceholder, setZIPcodePlaceholder] = useState('');
  const [cityPlaceholder, setCityPlaceholder] = useState('');
  const [NIPPlaceholder, setNIPPlaceholder] = useState('');

  const [nameLabel, setNameLabel] = useState('');
  const [surrnameLabel, setSurrnameLabel] = useState('');
  const [emailLabel, setEmailLabel] = useState('');
  const [phoneLabel, setPhoneLabel] = useState('');
  const [msgLabel, setMsgLabel] = useState('');
  const [companyLabel, setCompanyLabel] = useState('');
  const [streetLabel, setStreetLabel] = useState('');
  const [ZIPcodeLabel, setZIPcodeLabel] = useState('');
  const [cityLabel, setCityLabel] = useState('');
  const [NIPLabel, setNIPLabel] = useState('');

  const [center, setCenter] = useState(false);

  const windowSize: WindowSize = useWindowSize();

  useEffect(() => {
    if (windowSize.width < 576) {
      setNamePlaceholder('Imię*');
      setSurrnamePlaceholder('Nazwisko*');
      setEmailPlaceholder('E-mail*');
      setPhonePlaceholder('Numer telefonu*');
      setMsgPlaceholder('Uwagi');
      setCompanyPlaceholder('Firma');
      setStreetPlaceholder('Ulica');
      setZIPcodePlaceholder('Kod pocztowy');
      setCityPlaceholder('Miasto');
      setNIPPlaceholder('NIP');

      setNameLabel('');
      setSurrnameLabel('');
      setEmailLabel('');
      setPhoneLabel('');
      setMsgLabel('');
      setCompanyLabel('');
      setStreetLabel('');
      setZIPcodeLabel('');
      setCityLabel('');
      setNIPLabel('');

      setCenter(true);
    } else {
      setNamePlaceholder('');
      setSurrnamePlaceholder('');
      setEmailPlaceholder('');
      setPhonePlaceholder('');
      setMsgPlaceholder('');
      setCompanyPlaceholder('');
      setStreetPlaceholder('');
      setZIPcodePlaceholder('');
      setCityPlaceholder('');
      setNIPPlaceholder('');

      setNameLabel('Imię*');
      setSurrnameLabel('Nazwisko*');
      setEmailLabel('E-mail*');
      setPhoneLabel('Numer telefonu*');
      setMsgLabel('Uwagi');
      setCompanyLabel('Firma');
      setStreetLabel('Ulica');
      setZIPcodeLabel('Kod pocztowy');
      setCityLabel('Miasto');
      setNIPLabel('NIP');

      setCenter(false);
    }
    return;
  }, [windowSize.width]);

  return (
    <>
      <div className={styles.landingPage}>
        <div className={`container ${styles.accountsContainer}`}>
          <header>
            <h1 className={styles.landingTitle}>
              SALA KONFERENCYJNA '{conferenceRoom.name}'
            </h1>
          </header>
        </div>
      </div>
      <div className='container'>
        <div className={styles.infoContainer}>
          <ul className={styles.infoList}>
            <h2>Udogodnienia: </h2>
            {conferenceRoom.facilities.map((el) => (
              <li key={uuidv4()} className={styles.info}>
                {el}
              </li>
            ))}
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
            <h2 className={styles.title}>ZAREZERWUJ SALĘ JUZ TERAZ</h2>
          </header>
          <div className={styles.calendarContainer}>
            <p>Wybierz datę rezerwacji: </p>
            <HighliteDates startDate={startDate} setStartDate={setStartDate} />
          </div>
          <div className={styles.reservatedHoursContainer}>
            {generateReservatedHoursComponent(startDate)}
          </div>
          <div className={styles.choosingHours}>
            Zarezerwuj salę od{' '}
            <Input
              ref={inputStartRef}
              typeOfInput='SELECT'
              options={generateAvailableStartHoursArrayForChosenDay(startDate)}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                console.log(e.target.value);
                const value: string = e.target.value;
                setEndHours(
                  generateAvailableEndHoursArrayForChosenDay(startDate, value)
                );
              }}
            />{' '}
            do{' '}
            <Input
              ref={inputEndRef}
              typeOfInput='SELECT'
              options={generateAvailableEndHoursArrayForChosenDay(
                new Date(),
                '8:00'
              )}
              onChange={() => setAreReservationHoursForChosenDayShowed(true)}
            />
          </div>

          <div className={styles.formContainersContainer}>
            <div className={styles.formContainer}>
              <Input
                typeOfInput='SELECT'
                options={['1', '2', '3', '4', '5', '6']}
                label='Liczba osób'
                center={center}
              />
              <h3>Osoba kontaktowa</h3>
              <Input
                typeOfInput='INPUT'
                label={nameLabel}
                className={styles.input}
                placeholder={namePlaceholder}
                center={center}
              />
              <Input
                typeOfInput='INPUT'
                label={surrnameLabel}
                className={styles.input}
                placeholder={surrnamePlaceholder}
                center={center}
              />
              <Input
                typeOfInput='INPUT'
                label={emailLabel}
                className={styles.input}
                placeholder={emailPlaceholder}
                center={center}
              />
              <Input
                typeOfInput='INPUT'
                label={phoneLabel}
                className={styles.input}
                placeholder={phonePlaceholder}
                center={center}
              />
              <Input
                typeOfInput='TEXTAREA'
                label={msgLabel}
                className={styles.input}
                placeholder={msgPlaceholder}
                center={center}
              />
            </div>

            <div className={styles.formContainer}>
              <h3>Osoba kontaktowa</h3>
              <Input
                typeOfInput='INPUT'
                label={companyLabel}
                className={styles.input}
                placeholder={companyPlaceholder}
                center={center}
              />
              <Input
                typeOfInput='INPUT'
                label={streetLabel}
                className={styles.input}
                placeholder={streetPlaceholder}
                center={center}
              />
              <Input
                typeOfInput='INPUT'
                label={ZIPcodeLabel}
                className={styles.input}
                placeholder={ZIPcodePlaceholder}
                center={center}
              />
              <Input
                typeOfInput='INPUT'
                label={cityLabel}
                className={styles.input}
                placeholder={cityPlaceholder}
                center={center}
              />
              <Input
                typeOfInput='INPUT'
                label={NIPLabel}
                className={styles.input}
                placeholder={NIPPlaceholder}
                center={center}
              />
            </div>

            <div className={styles.btns}>
              <Button
                text='Anuluj'
                type='FULL'
                color='BLUE'
                btnWidth={150}
                className={styles.cancelBtn}
              />
              <Button
                text='Rezerwuj'
                type='FULL'
                color='GREEN'
                btnWidth={150}
                className={styles.resBtn}
              />
            </div>
          </div>
        </section>
      </div>
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

  const conferenceRoom: IConferenceRoomResponse = {
    id: conferenceRoomResponse._id.toString(),
    name: conferenceRoomResponse.name,
    photos: conferenceRoomResponse.photos,
    facilities: conferenceRoomResponse.facilities
  };

  const reservations: IShortenReservation[] = reservationResponse.map(
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

  return {
    props: {
      reservations: reservations || {},
      conferenceRoom: conferenceRoom || {}
    },
    revalidate: 3600
  };
}

export default Index;
