import { Auth0Client } from "@auth0/nextjs-auth0/server"

export const auth0 = new Auth0Client({
  secret: process.env.AUTH0_SECRET,
  domain: process.env.AUTH0_DOMAIN,
  appBaseUrl: process.env.NEXT_PUBLIC_FRONT_END,
  clientId: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  authorizationParameters: {
    scope: "openid profile email",
    audience: "htttps://kora-zucal.com",
  },
})

