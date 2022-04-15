import img from './sala8.jpeg';

export const rooms = [
  {
    id: 0,
    name: 'SALA KONFERENCYJNA',
    imgUrl: img.src,
    imgAlt: 'imgAlt',
    reservationDays: [
      {
        date: new Date('2022-04-15'),
        reservations: [
          {
            startHour: '12:00',
            endHour: '14:00',
            company: 'lol',
            price: 40
          }
        ]
      }
    ]
  }
];
