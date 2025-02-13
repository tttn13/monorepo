import { Auth0Client } from "@auth0/nextjs-auth0/server"
import { NextResponse } from "next/server"

export const auth0 = new Auth0Client({
  async onCallback(error, context, session) {
   console.log("on call back auth0")

    return NextResponse.redirect(
      new URL(context.returnTo || "/", process.env.APP_BASE_URL)
    )
  },
  authorizationParameters: {
    scope: "openid profile email",
    audience: "htttps://kora-zucal.com"
  },
  
})