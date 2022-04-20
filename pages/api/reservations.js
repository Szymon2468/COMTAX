import dbConnect from '../../app/lib/dbConnect';
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
    default:
      res.status(400).json({ success: false });
  }
}

const handleGet = async (req, res) => {
  try {
    let reservation;
    if (req.query.id) {
      reservation = await Reservation.findById(req.query.id);
    } else {
      reservation = await Reservation.find({});
    }
    res.status(200).json({ success: true, data: reservation });
  } catch (error) {
    res.status(400).json({ success: false, msg: error });
  }
};

const handlePut = async (req, res) => {
  try {
    const reservation = await Reservation.find({
      date: req.body.date,
      startHour: req.body.startHour,
      endHour: req.body.endHour
    });
    if (reservation.length && reservation.length !== 0) {
      res
        .status(400)
        .json({ success: false, msg: 'Nie mona utworzyć rezerwacji' });
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
