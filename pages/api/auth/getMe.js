import dbConnect from '../../../app/lib/dbConnect';
import User from '../../../app/models/User';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  const { method } = req;

  if (method !== 'GET') {
    res.status(400).json({ success: false });
  }

  await dbConnect();

  let token;

  if (req.cookies.comtaxLoginToken) {
    token = req.cookies.comtaxLoginToken.split(' ')[0];
  }

  // Make sure token exists
  if (!token) {
    res.status(200).json({ success: false, message: 'Not authorized' });
    return;
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);

    res.status(200).json({ success: true, user: user });
  } catch (err) {
    res.status(200).json({ success: false, message: 'Not authorized' });
    return;
  }
}
