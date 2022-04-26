import dbConnect from '../../app/lib/dbConnect';
import Reservation from '../../app/models/Reservation';

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'POST':
      await handlePost(req, res);
      break;
    default:
      res.status(400).json({ success: false });
  }
}

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
