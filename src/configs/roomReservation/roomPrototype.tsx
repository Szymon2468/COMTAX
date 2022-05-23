import { IReservation } from '../../../pages/admin-panel';

const startHrs: string[] = [
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

const endHrs = [
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

interface IAvailableStartHours {
  initialStartHour: string;
  startHours: string[];
}

export const getStartHours = (
  reservations: IReservation[]
): IAvailableStartHours => {
  let startHours: string[] = [...startHrs];

  reservations.map((reservation) => {
    const start = reservation.startHour;
    const end = reservation.endHour;
    let startIndex = startHours.findIndex((e) => e === start);
    let endIndex = startHours.findIndex((e) => e === end);

    if (start === '8:00' || startIndex === 0) {
      if (endIndex === -1 || endIndex + 1 >= startHours.length) {
        startHours = [];
      } else {
        startHours.splice(0, endIndex + 1);
      }
    } else {
      if (endIndex - startIndex + 2 > startHours.length || end === '18:00') {
        startHours.splice(startIndex - 1);
      } else {
        startHours.splice(startIndex - 1, endIndex - startIndex + 2);
      }
    }
  });

  return {
    initialStartHour: startHours[0],
    startHours
  };
};

interface IAvailableEndHours {
  initialEndHour: string;
  endHours: string[];
}

export const getEndHours = (
  reservations: IReservation[],
  hour: string
): IAvailableEndHours => {
  let endHours: string[] = [...endHrs];

  endHours.splice(0, endHours.findIndex((el) => el === hour) + 1);
  const hourIndex = endHours.findIndex((e) => e === hour);
  let hoursFound = false;

  if (hourIndex === -1) {
    endHours = [];
  } else {
    reservations.map((reservation) => {
      const start = reservation.startHour;
      let startIndex = endHours.findIndex((e) => e === start);

      if (hourIndex < startIndex && !hoursFound) {
        endHours.splice(startIndex);
        hoursFound = true;
      }
    });
  }

  return {
    endHours,
    initialEndHour: endHours[0]
  };
};
