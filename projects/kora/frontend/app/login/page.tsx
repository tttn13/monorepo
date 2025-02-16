'use client'

import Loginlogin from "../components/login-login";

export default function Login() {
  const encoded = encodeURIComponent("/home");
  const url = process.env.NEXT_PUBLIC_STORAGE_PROVIDER == "minio" 
    ? `${process.env.NEXT_PUBLIC_MINIO_URL}/zucal-public/blob.svg`
    : `${process.env.NEXT_PUBLIC_AWS_URL}/blob.svg`
  
  return (
    <>
      <div className="flex">
        <div className="place-items-center h-dvh flex flex-col justify-center px-8 w-3/5 background-cus"
          style={{ backgroundImage: `url(${url})`, backgroundSize: 'cover' }}>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Welcome to Zucal
          </h1>
          <p className="mt-4 text-xl text-gray-500">
            Your only calendar and scheduling tool
          </p>
        </div>

        <div className="flex-auto h-dvh bg-gray-800 flex flex-col justify-center" >
          <div className="flex justify-center ">
            <a href={`/auth/login?returnTo=${encoded}`}>
              <Loginlogin text="Sign in to your account"/>
              {/* <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white ">Sign in to your account</h2> */}
            </a>      
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <div className="mt-10 text-center text-sm/6 text-white  text-opacity-50">
              No account ?
              <a href={`/auth/login?returnTo=${encoded}`} className="font-semibold text-indigo-600 hover:text-indigo-500">
              <Loginlogin text="Sign up"/>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}