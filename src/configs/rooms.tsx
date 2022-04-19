import img from './sala8.jpeg';

export const rooms = [
  {
    id: 0,
    name: 'SALA KONFERENCYJNA',
    imgUrl: img.src,
    imgAlt: 'imgAlt',
    reservationDays: [
      {
        date: new Date('2022-04-19'),
        reservations: [
          {
            startHour: '12:00',
            endHour: '13:00',
            company: 'lol',
            price: 40
          },
          {
            startHour: '15:00',
            endHour: '17:00',
            company: 'lol',
            price: 40
          }
        ]
      }
    ]
  }
];
