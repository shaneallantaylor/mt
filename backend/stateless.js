import Iron from '@hapi/iron';
import * as cookie from 'cookie';

const TOKEN_NAME = 'keystonejs-session';

function asSessionStrategy(sessionStrategy) {
  return sessionStrategy;
}

export function statelessSessions({
  secret,
  maxAge,
  path = '/',
  sameSite,
  secure = process.env.NODE_ENV === 'production',
  ironOptions = Iron.defaults,
}) {
  return () => {
    if (!secret) {
      throw new Error('You must specify a session secret to use sessions');
    }
    if (secret.length < 32) {
      throw new Error('The session secret must be at least 32 characters long');
    }
    return asSessionStrategy({
      async get({ req, createContext }) {
        if (!req.headers.cookie) return;
        const cookies = cookie.parse(req.headers.cookie);
        if (!cookies[TOKEN_NAME]) return;
        try {
          return await Iron.unseal(cookies[TOKEN_NAME], secret, ironOptions);
        } catch (err) {}
      },
      async end({ res }) {
        res.setHeader(
          'Set-Cookie',
          cookie.serialize(TOKEN_NAME, '', {
            maxAge: 0,
            expires: new Date(),
            httpOnly: true,
            secure,
            path,
            sameSite,
          })
        );
      },
      async start({ res, data }) {
        const sealedData = await Iron.seal(data, secret, {
          ...ironOptions,
          ttl: maxAge * 1000,
        });

        res.setHeader(
          'Set-Cookie',
          cookie.serialize(TOKEN_NAME, sealedData, {
            maxAge,
            expires: new Date(Date.now() + maxAge * 1000),
            httpOnly: true,
            secure,
            path,
            sameSite,
          })
        );

        return sealedData;
      },
    });
  };
}
