import dbConnect from '../../../../app/lib/dbConnect';
import User from '../../../../app/models/User';
import crypto from 'crypto';
import sendTokenResponse from '../../../../app/lib/sendTokenResponse';

export default async function handler(req, res) {
  const { method } = req;

  if (method !== 'PUT') {
    res.status(400).json({ success: false });
  }

  await dbConnect();
  const token = req.query.resettoken;
  console.log(token);

  // Get hashed token
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(token)
    .digest('hex');

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() }
  });

  if (!user) {
    res.status(200).json({ success: false, msg: 'Invalid token' });
    return;
  }

  // Set new password
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  res.status(200).json({ success: true });
}
