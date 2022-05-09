import dbConnect from '../../../app/lib/dbConnect';
import User from '../../../app/models/User';

export default async function handler(req, res) {
  const { method } = req;

  if (method !== 'POST') {
    res.status(400).json({ success: false });
  }

  await dbConnect();

  try {
    const { name, email, password, role } = req.body;

    // Create user
    const user = await User.create({
      name,
      email,
      password,
      role
    });

    sendTokenResponse(user, 200, res);
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false });
  }
}
