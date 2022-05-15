import { IImage } from '../../components/Gallery/Gallery';

export interface IShortenReservation {
  _id: string;
  conferenceRoom: string;
  date: Date;
  startHour: string;
  endHour: string;
}

export interface IConferenceRoomResponse {
  id: string;
  name: string;
  photos: IImage[];
  facilities: string[];
  address: string;
  city: string;
}

export interface IReservationDateType {
  startHour: string;
  endHour: string;
}

export interface IReservationFormValues {
  startHour: string;
  endHour: string;
  numberOfPeople: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
  message: string;
  company: string;
  street: string;
  zipCode: string;
  city: string;
  NIP: string;
}

// export const images: IImage[] = [
//   {
//     url: BackgroundImage.src,
//     title: 'a'
//   },
//   {
//     url: BackgroundImage.src,
//     title: 'ab'
//   },
//   {
//     url: BackgroundImage.src,
//     title: 'ac'
//   },
//   {
//     url: BackgroundImage.src,
//     title: 'ad'
//   },
//   {
//     url: BackgroundImage.src,
//     title: 'a'
//   },
//   {
//     url: BackgroundImage.src,
//     title: 'ab'
//   },
//   {
//     url: BackgroundImage.src,
//     title: 'ac'
//   },
//   {
//     url: BackgroundImage.src,
//     title: 'ad'
//   }
// ];

export const availableStartHours = [
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

export const availableEndHours = [
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

export const possibleNumberOfPeople = ['1', '2', '3', '4', '5', '6'];

export const getStartHour = (currentReservations: IShortenReservation[]) => {
  for (const el of currentReservations) {
    if (
      el.startHour === availableStartHours[0] ||
      el.startHour === availableStartHours[1]
    ) {
      return availableStartHours[
        availableStartHours.findIndex((avHour) => avHour === el.endHour) + 1
      ];
    }
  }
  return '8:00';
};

export const generateStartHours = (
  startHours: string[],
  currentReservations: IShortenReservation[]
) => {
  let excludedHours: IReservationDateType[] = [];
  let hours = [...startHours];

  currentReservations.map((el) =>
    excludedHours.push({
      startHour: el.startHour,
      endHour: el.endHour
    })
  );

  for (const excludedHour of excludedHours) {
    const startIndex = hours.findIndex((el) => excludedHour.startHour === el);
    const endIndex = hours.findIndex((el) => excludedHour.endHour === el);

    if (startIndex.toString() !== '-1' && endIndex.toString() !== '-1') {
      const nrOfRemovedHours = endIndex - startIndex + 1;
      hours.splice(startIndex, nrOfRemovedHours);
    }
  }

  return hours;
};

export const generateEndHours = (
  startHour: string,
  currentReservations: IShortenReservation[]
) => {
  let endHours = [...availableEndHours];
  let excludedHours: IReservationDateType[] = [];

  currentReservations.map((el) =>
    excludedHours.push({
      startHour: el.startHour,
      endHour: el.endHour
    })
  );

  const startIndex = endHours.findIndex((el) => el === startHour);

  endHours.splice(0, startIndex + 1);

  if (excludedHours.length > 0) {
    let minIndex: number = endHours.length + 100;
    for (let i = 0; i < excludedHours.length; i++) {
      if (
        endHours.findIndex((el) => startHour === el) <
          endHours.findIndex((el) => excludedHours[i].startHour === el) &&
        i < minIndex
      ) {
        minIndex = i;
      }
    }
    if (minIndex === endHours.length + 100) {
      return endHours;
    } else {
      const removeIndex = endHours.findIndex(
        (el) => el === excludedHours[minIndex].startHour
      );
      endHours.splice(removeIndex);
    }
  }
  return endHours;
};

export const generateReservatedHoursComponent = (
  currentReservations: IShortenReservation[]
) => {
  let excludedHours: IReservationDateType[] = [];
  let result: JSX.Element[] = [];

  for (let reservation of currentReservations) {
    excludedHours.push({
      startHour: reservation.startHour,
      endHour: reservation.endHour
    });
  }

  if (!excludedHours.length) {
    return result;
  }
  return (
    <>
      <h3>Ta sala w tym dniu jest zarezerwowana w godzinach:</h3>
      <div>
        {excludedHours.map((el) => (
          <p>
            {el.startHour} - {el.endHour}
          </p>
        ))}
      </div>
    </>
  );
};
