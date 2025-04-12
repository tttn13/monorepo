'use client'

import LoginBtnOnLoginPage from "../components/login-btn-on-login";
import Hero from "../components/hero";

export default function Login() {
  const encoded = encodeURIComponent("/home");
  const url = process.env.NEXT_PUBLIC_STORAGE_PROVIDER == "minio" 
    ? `${process.env.NEXT_PUBLIC_MINIO_URL}/zucal-public/blob.svg`
    : `${process.env.NEXT_PUBLIC_AWS_URL}/blob.svg`
  
  return (
    <>
      <div className="flex">
        <Hero/>
        <div className="flex-auto h-dvh bg-gray-800 flex flex-col justify-center" >
          <div className="flex justify-center ">
            <a href={`/auth/login?returnTo=${encoded}`}>
            <LoginBtnOnLoginPage text="Sign in to your account"/>
            </a>      
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <div className="mt-10 text-center text-sm/6 text-white  text-opacity-50">
              No account ?
              <a href={`/auth/login?returnTo=${encoded}`} className="font-semibold text-indigo-600 hover:text-indigo-500">
              <LoginBtnOnLoginPage text="Sign up"/>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}