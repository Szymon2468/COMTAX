import dbConnect from '../../../app/lib/dbConnect';
import sendTokenResponse from '../../../app/lib/sendTokenResponse';
import User from '../../../app/models/User';

export default async function handler(req, res) {
  const { method } = req;

  if (method !== 'POST') {
    res.status(400).json({ success: false });
  }

  await dbConnect();

  /* @TODO:

  > change req.body.email to be lower case

  > check if email AND password are given, if not:
    res
      .status(400)
      .json({ success: false, msg: 'Please provide an email and password' });
    return;

  > find user by email and select additionaly password use findOne mongoose method

  > check if user exists, if not:
    res.status(200).json({ success: false, msg: 'Invalid credentials' });
    return;

  > check if given password is matching the current one in mongo, 
    use one of functions declared in User model. If not:
    res.status(200).json({ success: false, msg: 'Invalid credentials' });
    return;
  */

  sendTokenResponse(user, 200, res);
}
