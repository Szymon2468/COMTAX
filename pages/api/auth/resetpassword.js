import dbConnect from '../../../app/lib/dbConnect';
import User from '../../../app/models/User';

export default async function handler(req, res) {
  const { method } = req;

  if (method !== 'PUT') {
    res.status(400).json({ success: false });
  }

  await dbConnect();

  // Get hashed token
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.resettoken)
    .digest('hex');

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() }
  });

  if (!user) {
    res.status(400).json({ success: false, msg: 'Invalid token' });
  }

  // Set new password
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  sendTokenResponse(user, 200, res);
}
