import dbConnect from '../../../app/lib/dbConnect';
import { paginate } from '../../../app/lib/paginate';
import User from '../../../app/models/User';

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const users = User.find({}, 'name surname email role').sort('surname');

        let result;
        let pagination;
        if (req.query.page && req.query.limit) {
          pagination = await paginate(users, User, req);
          result = pagination.results;
        } else {
          result = await users;
        }

        res.status(200).json({
          success: true,
          count: result.length,
          pagination: pagination ? pagination.pagination : null,
          data: result
        });
      } catch (error) {
        console.error(error);
        res.status(400).json({ success: false });
      }
      break;
    case 'POST':
      try {
        req.body.email = req.body.email.toLowerCase();
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
