import { serialize } from 'cookie';

export const setCookie = (res, name, value, options = {}) => {
  const stringValue =
    typeof value === 'object' ? 'j:' + JSON.stringify(value) : String(value);

  if ('expires' in options) {
    options.expires = options.expires;
  }

  res.setHeader('Set-Cookie', serialize(name, stringValue, options));
};

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  };

  if (process.env.NODE_ENV === 'production') {
    options.secure = true;
  }

  // Calling our pure function using the `res` object, it will add the `set-cookie` header
  setCookie(res, 'comtaxLoginToken', token, options);
  // Return the `set-cookie` header so we can display it in the browser and show that it works!
  res.status(200).json({ success: true }).end(res.getHeader('Set-Cookie'));
};

export default sendTokenResponse;
