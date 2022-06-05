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
  // @TODO: Create token (one line, use function declared in User model)

  res.status(200).json({
    success: true,
    token: token,
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    )
  });
};

export default sendTokenResponse;
