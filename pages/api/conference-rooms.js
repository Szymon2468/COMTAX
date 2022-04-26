import dbConnect from '../../app/lib/dbConnect';
import ConferenceRoom from '../../app/models/ConferenceRoom';

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
    case 'POST':
      await handlePost(req, res);
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}

const handleGet = async (req, res) => {
  try {
    let conferenceRooms;
    if (req.query.id) {
      conferenceRooms = await ConferenceRoom.findById(req.query.id);
    } else {
      conferenceRooms = await ConferenceRoom.find({});
    }
    res.status(200).json({ success: true, data: conferenceRooms });
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, msg: error });
  }
};

const handlePut = async (req, res) => {
  try {
    const conferenceRoom = await ConferenceRoom.create(req.body);
    res.status(200).json({ success: true, data: conferenceRoom });
  } catch (error) {
    res.status(400).json({ success: false, msg: error });
  }
};

const handlePost = async (req, res) => {
  try {
    const conferenceRoom = await ConferenceRoom.findByIdAndUpdate(
      req.query.id,
      req.body
    );
    res.status(200).json({ success: true, data: conferenceRoom });
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, msg: error });
  }
};
