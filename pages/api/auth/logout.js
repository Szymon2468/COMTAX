import dbConnect from '../../../app/lib/dbConnect';
import { setCookie } from '../../../app/lib/sendTokenResponse';

export default async function handler(req, res) {
  const { method } = req;

  if (method !== 'GET') {
    res.status(400).json({ success: false });
  }

  await dbConnect();

  //logout
  setCookie(res, 'comtaxLoginToken', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });

  res.end(res.getHeader('Set-Cookie'));
}
