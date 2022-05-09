import dbConnect from '../../../app/lib/dbConnect';
import User from '../../../app/models/User';
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  const { method } = req;

  if (method !== 'POST') {
    res.status(400).json({ success: false });
  }

  await dbConnect();

  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    res
      .status(404)
      .json({ success: false, msg: 'There is no user with that email' });
    return;
  }

  // Get reset token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  // Create reset url
  const resetUrl = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/auth/resetpassword/${resetToken}`;

  const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a PUT request to: \n\n ${resetUrl}`;

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_SERVICE,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    const msg = {
      from: `COMTAX <${process.env.FROM_EMAIL}>`,
      to: user.email,
      subject: `Zapomniane Hasło COMTAX: ${user.name}`,
      text: message
    };

    await transporter.sendMail(msg, function (error, info) {
      if (error) {
        console.error(error);
        res.status(400).json({ success: false, message: error });
      }
    });

    res.status(200).json({ success: true, data: 'Email sent' });
    return;
  } catch (err) {
    console.error(err);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    res.status(500).json({ success: false, msg: 'Email could not be sent' });
    return;
  }
}
