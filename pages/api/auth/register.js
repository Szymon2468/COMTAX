import dbConnect from '../../../app/lib/dbConnect';
import sendTokenResponse from '../../../app/lib/sendTokenResponse';
import User from '../../../app/models/User';

export default async function handler(req, res) {
  const { method } = req;

  if (method !== 'POST') {
    res.status(400).json({ success: false });
  }

  await dbConnect();

  try {
    req.body.email = req.body.email.toLowerCase();
    const { name, surname, email, password, role } = req.body;

    // Create user
    const user = await User.create({
      name,
      surname,
      email,
      password,
      role
    });

    sendTokenResponse(user, 200, res);
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, msg: error });
  }
}
