import dbConnect from '../../../app/lib/dbConnect';
import User from '../../../app/models/User';

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const users = await User.find({}, 'name surname email role');
        res.status(200).json({ success: true, data: users });
      } catch (error) {
        console.error(error);
        res.status(400).json({ success: false });
      }
      break;
    case 'POST':
      try {
        const { name, surname, email, password, role } = req.body;
        const user = await User.create({
          name,
          surname,
          email,
          password,
          role
        });
        res.status(201).json({ success: true, data: user });
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
