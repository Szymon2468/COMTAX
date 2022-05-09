import dbConnect from '../../../app/lib/dbConnect';
import sendTokenResponse from '../../../app/lib/sendTokenResponse';
import User from '../../../app/models/User';

export default async function handler(req, res) {
  const { method } = req;

  if (method !== 'PUT') {
    res.status(400).json({ success: false });
  }

  await dbConnect();

  const user = await User.findById(req.user.id).select('+password');

  // Check current password
  if (!(await user.matchPassword(req.body.currentPassword))) {
    res.status(401).json({ success: false, msg: 'Password is incorrect' });
    return;
  }

  user.password = req.body.newPassword;
  await user.save();

  sendTokenResponse(user, 200, res);
}
