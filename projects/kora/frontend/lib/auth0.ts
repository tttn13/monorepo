import { Auth0Client } from "@auth0/nextjs-auth0/server"
import { NextResponse } from "next/server"

export const auth0 = new Auth0Client({
  authorizationParameters: {
    scope: "openid profile email",
    audience: "htttps://kora-zucal.com"
  },
  
})