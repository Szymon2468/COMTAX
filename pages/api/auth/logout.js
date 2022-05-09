import dbConnect from '../../../app/lib/dbConnect';

export default async function handler(req, res) {
  const { method } = req;

  if (method !== 'GET') {
    res.status(400).json({ success: false });
  }

  await dbConnect();

  //logout
  res.cookie('comtaxLoginToken', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });

  res.status(200).json({
    success: true,
    data: {}
  });
}
