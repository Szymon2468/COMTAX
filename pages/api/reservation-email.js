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
        <p>Imię: ${req.body.name}</p>
        <p>Nazwisko: ${req.body.surrname}</p>
        <p>Numer telefonu: ${req.body.phone}</p>
        <p>Adres e-mail: ${req.body.email}</p>
        <p>
          Uwagi: <br />
          ${req.body.msg}
        </p>
        <p>Firma: ${req.body.company}</p>
        <p>Ulica: ${req.body.street}</p>
        <p>Kod pocztowy: ${req.body.ZIPCode}</p>
        <p>Miasto: ${req.body.city}</p>
        <p>NIP: ${req.body.NIP}</p>
        <p>Data rezerwacji: ${req.body.date}</p>
        <p>Godzina rozpoczęcia: ${req.body.startHour}</p>
        <p>Godzine zakończenia: ${req.body.endHour}</p>
        <p>Liczba osób: ${req.body.nrOfPeople}</p>
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
      }
    });
    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, message: error });
  }
}
