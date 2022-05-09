import dbConnect from '../../../app/lib/dbConnect';
import User from '../../../app/models/User';

export default async function handler(req, res) {
  const { method } = req;
  const id = req.query.id;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const users = await User.findById(id, 'name surname email role');
        res.status(200).json({ success: true, data: users });
      } catch (error) {
        console.error(error);
        res.status(400).json({ success: false });
      }
      break;
    // Update User
    case 'POST':
      try {
        if (req.body.password) {
          delete req.body.password;
        }

        const user = await await User.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true
        });

        res.status(201).json({ success: true, data: user });
      } catch (error) {
        console.error(error);
        res.status(400).json({ success: false });
      }
      break;

    case 'DELETE':
      try {
        await User.findByIdAndDelete(id);

        res.status(200).json({
          success: true,
          data: {}
        });
      } catch (error) {
        console.error(error);
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
