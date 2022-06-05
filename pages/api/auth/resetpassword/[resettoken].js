import dbConnect from '../../../../app/lib/dbConnect';
import User from '../../../../app/models/User';
import crypto from 'crypto';

export default async function handler(req, res) {
  const { method } = req;

  if (method !== 'PUT') {
    res.status(400).json({ success: false });
  }

  await dbConnect();
  const token = req.query.resettoken;

  /* @TODO:

  > create hashed resetPasswordToken from token using crypto  

  > find user by resetPasswordToken and resetPasswordExpire where 
    resetPasswordExpire is grater than Date.now()
    To find element greater than something you should youse syntax
      User.findOne({siema: { $gt: coś }}) gt = greater than, eg. $gte = greater than or equal
    use findOne mongoose method

    > check if user exists, if not 
      res.status(200).json({ success: false, msg: 'Invalid token' });
      return;

    > set new password and save data to user
      password -> new password, tokens to undefined, then use user.save() (it is asynchronous!)

  */

  res.status(200).json({ success: true });
}
