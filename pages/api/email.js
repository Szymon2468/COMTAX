import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_SERVICE,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    const mailBody = `
        <p>Imię i nazwisko: ${req.body.name}</p>
        <p>Numer telefonu: ${req.body.phone}</p>
        <p>Adres e-mail: ${req.body.email}</p>
        <p>Preferowany sposób kontaktu: ${req.body.contact}</p>
        <p>
          Wiadomość: <br />
          ${req.body.msg}
        </p>
        `;

    const msg = {
      from: `COMTAX FORM <${process.env.FROM_EMAIL}>`,
      to: process.env.TO_EMAIL,
      subject: `Formularz od ${req.body.name}`,
      text: mailBody
    };

    await transporter.sendMail(msg, function (error, info) {
      if (error) {
        console.error(error);
        res.status(400).json({ success: false, message: error });
      } else {
        console.log('Message sent: %s', info.messageId);
        res.status(200).json({ success: true });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, message: error });
  }
}
