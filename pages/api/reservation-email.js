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

    const date = new Date(req.body.date);

    const mailBody = `
      <h2 style="margin:0;color:black">Dokonano rezerwacji:</h2>
      <p style="margin:0;line-height:1.1em;color:black">Sala: <b> ${
        req.body.room.name
      } | ${req.body.room.address}, ${req.body.room.city} </b></p>
      <p style="margin:0;line-height:1.1em;color:black">Data rezerwacji: <b>${
        date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
      }.${
      date.getMonth() < 10 ? `0${date.getMonth()}` : date.getMonth()
    }.${date.getFullYear()} </b> </p>
      <p style="margin:0;line-height:1.1em;color:black">Godzina rozpoczęcia: <b>${
        req.body.startHour
      } </b> </p>
      <p style="margin:0;line-height:1.1em;color:black">Godzina zakończenia: <b>${
        req.body.endHour
      }</b></p>
      <br />
      <h3 style="margin:0;color:black">Osoba kontaktowa:</h3>
      <p style="margin:0;line-height:1.1em;color:black">Imię: <b>${
        req.body.name
      }</b></p>
      <p style="margin:0;line-height:1.1em;color:black">Nazwisko: <b>${
        req.body.surname
      }</b></p>
      <p style="margin:0;line-height:1.1em;color:black">Numer telefonu: <b>${
        req.body.phone
      }</b></p>
      <p style="margin:0;line-height:1.1em;color:black">Adres e-mail: <b>${
        req.body.email
      }</b></p>
      <p style="margin:0;line-height:1.1em;color:black">Liczba osób: <b>${
        req.body.numberOfPeople
      }</b></p>
      <p style="margin:0;line-height:1.1em;color:black">
        Uwagi:
        <b>${req.body.message !== '' ? req.body.message : 'nie podano'}</b>
      </p>
      <h3 style="margin:0;color:black">Dane do faktury:</h3>
      <p style="margin:0;line-height:1.1em;color:black">Firma: <b>${
        req.body.company !== '' ? req.body.company : 'nie podano'
      }</b></p>
      <p style="margin:0;line-height:1.1em;color:black">Ulica: <b>${
        req.body.street !== '' ? req.body.street : 'nie podano'
      }</b></p>
      <p style="margin:0;line-height:1.1em;color:black">Kod pocztowy: <b>${
        req.body.zipCode !== '' ? req.body.zipCode : 'nie podano'
      }</b></p>
      <p style="margin:0;line-height:1.1em;color:black">Miasto: <b>${
        req.body.city !== '' ? req.body.city : 'nie podano'
      }</b></p>
      <p style="margin:0;line-height:1.1em;color:black">NIP: <b>${
        req.body.NIP !== '' ? req.body.NIP : 'nie podano'
      }</b></p>
      </div>
    `;

    const msg = {
      from: `COMTAX REZERWACJA <${process.env.FROM_EMAIL}>`,
      to: process.env.TO_EMAIL,
      subject: `Rezerwacja sali od ${req.body.name} ${req.body.surname}`,
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
