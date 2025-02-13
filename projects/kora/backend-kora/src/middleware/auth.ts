import jwt from 'koa-jwt';
import jwksRsa from 'jwks-rsa';
import { Context } from 'koa';

export const jwtCheck = jwt({
  secret: jwksRsa.koaJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://dev-dtmwhke5ke751f6m.us.auth0.com/.well-known/jwks.json`
  }),
  audience: ["htttps://kora-zucal.com","https://dev-dtmwhke5ke751f6m.us.auth0.com/userinfo"],
  issuer: `https://dev-dtmwhke5ke751f6m.us.auth0.com/`,
  algorithms: ['RS256']
});

export const authDebug = async (ctx: Context, next: () => Promise<any>) => {
    try {
        console.log('=== Auth Debug ===');
        console.log('Headers:', ctx.headers);
        console.log('Auth header:', ctx.headers.authorization);
        console.log('Audience:', process.env.AUTH0_AUDIENCE);
        console.log('Issuer:', process.env.AUTH0_ISSUER_BASE_URL);
        
        await next();
        
        console.log('Token validated successfully');
        console.log('User:', ctx.state.user);
    } catch (error) {
        const errorM = error as Error;
        console.error('Auth Error:', {
            name: errorM.name,
            message: errorM.message,
            stack: errorM.stack
        });
        throw error;
    }
};