import mongoose from 'mongoose';

const ReservationSchema = new mongoose.Schema({
  conferenceRoom: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'ConferenceRoom'
  },
  date: {
    type: String,
    required: true
  },
  startHour: {
    type: String,
    required: [true, 'Proszę uzupełnić godzinę rozpoczęcia rezerwacji']
  },
  endHour: {
    type: String,
    required: [true, 'Proszę uzupełnić godzinę zakończenia rezerwacji']
  },
  numberOfPeople: {
    type: Number,
    min: 1,
    max: 6,
    required: true
  },
  name: {
    type: String,
    required: [true, 'Proszę podać swoje imię']
  },
  surname: {
    type: String,
    required: [true, 'Proszę podać swoje nazwisko']
  },
  email: {
    type: String,
    required: [true, 'Proszę podać swój adres e-mail'],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Proszę podać poprawny adres e-mail'
    ]
  },
  phone: {
    type: String,
    required: [true, 'Proszę podać swój numer telefonu'],
    match: [
      /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/,
      'Proszę podać poprawny numer telefonu'
    ]
  },
  message: {
    type: String,
    maxlength: [500, 'Uwagi nie mogą zawierać więcej niż 500 znaków']
  },
  company: {
    type: String
  },
  street: {
    type: String
  },
  zipCode: {
    type: String
  },
  city: {
    type: String
  },
  NIP: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports =
  mongoose.models.Reservation ||
  mongoose.model('Reservation', ReservationSchema);
