import dbConnect from '../../../app/lib/dbConnect';
import User from '../../../app/models/User';
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  const { method } = req;

  if (method !== 'POST') {
    res.status(400).json({ success: false });
  }

  await dbConnect();

  req.body.email = req.body.email.toLowerCase();
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    res
      .status(200)
      .json({ success: false, msg: 'There is no user with that email' });
    return;
  }

  // Get reset token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  // Create reset url
  const resetUrl = `${process.env.SITE_URL}/admin-panel/reset-hasla/${resetToken}`;

  const message = `
    <h3 style="margin:0;color:black">Została zgłoszona prośba o reset hasła w serwisie COMTAX na koncie przypisanym do tego adresu e-mail.</h3>
    <p style="margin:0;line-height:1.1em;color:black">W celu zresetowania hasła prosimy o odwiedzenie poniższej strony: </p>
    <p style="margin:0;line-height:1.1em;color:black"><a href='${resetUrl}'>RESET HASŁA</a> </p>
    <br/>
    <p style="margin:0;line-height:1.1em;color:black">Jeśli to nie Ty poprosiłeś/aś o zmianę hasła, prosimy o zignorowanie tej wiadomości.</p>
    <br/>
    <p style="margin:0;line-height:1.1em;color:black">Pozdrawiamy</p>
    <p style="margin:0;line-height:1.1em;color:black">Zespół COMTAX</p>
  `;

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
