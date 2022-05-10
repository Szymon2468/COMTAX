import dbConnect from '../../../app/lib/dbConnect';
import sendTokenResponse from '../../../app/lib/sendTokenResponse';
import User from '../../../app/models/User';

export default async function handler(req, res) {
  const { method } = req;

  if (method !== 'POST') {
    res.status(400).json({ success: false });
  }

  await dbConnect();

  req.body.email = req.body.email.toLowerCase();
  const { email, password } = req.body;

  // Validate email & password
  if (!email || !password) {
    res
      .status(400)
      .json({ success: false, msg: 'Please provide an email and password' });
    return;
  }

  // Check for user
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    res.status(200).json({ success: false, msg: 'Invalid credentials' });
    return;
  }

  // Check if password matches
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    res.status(200).json({ success: false, msg: 'Invalid credentials' });
    return;
  }

  sendTokenResponse(user, 200, res);
}
