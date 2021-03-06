import dbConnect from '../../app/lib/dbConnect';
import { paginate } from '../../app/lib/paginate';
import Reservation from '../../app/models/Reservation';

export default async function handler(req, res) {
  const { method } = req;
  await dbConnect();

  switch (method) {
    case 'GET':
      await handleGet(req, res);
      break;
    case 'PUT':
      await handlePut(req, res);
      break;
    case 'DELETE':
      await handleDelete(req, res);
      break;
    case 'POST':
      await handlePost(req, res);
      break;
    default:
      res.status(400).json({ success: false });
  }
}

const handleGet = async (req, res) => {
  try {
    let reservation;
    if (req.query.id) {
      reservation = Reservation.findById(req.query.id);
    } else if (req.query.conferenceRoom && req.query.date) {
      const date = new Date(parseInt(req.query.date));
      date.setUTCHours(2, 0, 0, 0);

      reservation = Reservation.find({
        conferenceRoom: req.query.conferenceRoom,
        date: date.getTime()
      });
    } else {
      reservation = Reservation.find({});
    }

    let result;

    let pagination;
    if (req.query.page && req.query.limit) {
      pagination = await paginate(reservation, Reservation, req);
      result = pagination.results;
    } else {
      result = await reservation;
    }

    result.sort((a, b) => {
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

    res.status(200).json({
      success: true,
      count: result.length,
      pagination: pagination ? pagination.pagination : null,
      data: result
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, msg: error });
  }
};

const handlePut = async (req, res) => {
  try {
    const date = new Date(parseInt(req.body.date));
    date.setUTCHours(2, 0, 0, 0);
    req.body.date = date.getTime();
    req.body.numberOfPeople = parseInt(req.body.numberOfPeople);

    const reservation = await Reservation.find({
      date: date.getTime(),
      startHour: req.body.startHour,
      endHour: req.body.endHour
    });
    if (reservation.length && reservation.length !== 0) {
      res
        .status(400)
        .json({ success: false, msg: 'Nie mo??na utworzy?? rezerwacji' });
      return;
    }

    const newReservation = await Reservation.create(req.body);
    res.status(200).json({ success: true, data: newReservation });
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, msg: error });
  }
};

const handleDelete = async (req, res) => {
  try {
    const reservation = await Reservation.deleteOne({ _id: req.query.id });
    res.status(200).json({ success: true, data: reservation });
  } catch (error) {
    res.status(400).json({ success: false, msg: error });
  }
};

const handlePost = async (req, res) => {
  try {
    const reservation = await Reservation.findByIdAndUpdate(
      req.query.id,
      req.body
    );
    res.status(200).json({ success: true, data: reservation });
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, msg: error });
  }
};
