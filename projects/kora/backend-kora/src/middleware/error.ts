// middleware/error.ts
import { Context, Next } from 'koa';

export async function errorHandler(ctx: Context, next: Next) {
  try {
    await next();
  } catch (err: any) {
    if (err.status === 401) {
      ctx.status = 401;
      ctx.body = {
        error: 'Authentication failed',
        message: 'Invalid or expired token'
      };
      return;
    }

    ctx.status = err.status || 500;
    ctx.body = {
      error: err.message || 'Internal Server Error'
    };
  }
}