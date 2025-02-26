'use client'
import Link from 'next/link'
import { Josefin_Sans, Playwrite_IN } from 'next/font/google'
import Carousel from './components/carousel'
import Logo from './components/logo'
import LoginBtn from './components/login-btn'

const playwrite = Playwrite_IN()
const sans = Josefin_Sans({ subsets: ['latin'] })
export default function Home() {
   
  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex items-center justify-between p-6 bg-white border-b shadow-xl">
        <h2 className={`${sans.className} text-2xl font-bold`}>ZUCAL</h2>
        <nav>
          <ul className="flex space-x-4">
            {/* <li><Link href="#" className="text-gray-600 hover:text-blue-600">About us</Link></li>
            <li><Link href="#" className="text-gray-600 hover:text-blue-600">Features</Link></li> */}
            {/* <li><Link href="/login" className="text-gray-600 hover:text-blue-600">Try our Product</Link></li> */}
          </ul>
        </nav>
        <div className="flex items-center space-x-4">
          <Link href="/login"><Logo text='Get Started' /></Link>
        </div>
      </header>
      <main className="flex-grow">
        <section className="py-20 px-6 text-center">
          <h1 className={`${playwrite.className} text-5xl font-bold mb-8`}>Easy scheduling <span className="text-primary">ahead</span></h1>
          <p className="text-xl text-gray-600 mb-8">Zucal is your scheduling automation platform for eliminating the back-and-forth emails for finding the perfect time — and so much more.</p>
          <Link href="/login"><LoginBtn /></Link>
          <Carousel />
        </section>
        <section className="bg-gray-100 py-20 px-6 footer-cus">
          <div className="max-w-4xl mx-auto text-center ">
            <h2 className="text-3xl font-bold mb-6">We make scheduling easy</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-2">Easy to use</h3>
                <p className="text-gray-600">Create your schedule once, and you're ready to go.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Flexible</h3>
                <p className="text-gray-600">Adapt to your needs with customizable options.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Time-saving</h3>
                <p className="text-gray-600">Automate your scheduling to focus on what matters.</p>
              </div>
            </div>
          </div>
        </section>
        <footer className={`bg-gray-800 text-white py-10 px-6 flex flex-col items-center justify-center ${sans.className}`}>
          <div className='flex mb-4'>
            <h4 className="text-lg font-semibold mr-1">Made with</h4>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 mr-1">
              <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
            </svg>
            <h4 className="text-lg font-semibold mr-1">by Zulon Team</h4>
          </div>
          <a href="https://github.com/tttn13/monorepo">
          <svg viewBox="0 0 24 24" aria-hidden="true" className="size-6" style={{ "fill": "white" }} ><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.463 2 11.97c0 4.404 2.865 8.14 6.839 9.458.5.092.682-.216.682-.48 0-.236-.008-.864-.013-1.695-2.782.602-3.369-1.337-3.369-1.337-.454-1.151-1.11-1.458-1.11-1.458-.908-.618.069-.606.069-.606 1.003.07 1.531 1.027 1.531 1.027.892 1.524 2.341 1.084 2.91.828.092-.643.35-1.083.636-1.332-2.22-.251-4.555-1.107-4.555-4.927 0-1.088.39-1.979 1.029-2.675-.103-.252-.446-1.266.098-2.638 0 0 .84-.268 2.75 1.022A9.607 9.607 0 0 1 12 6.82c.85.004 1.705.114 2.504.336 1.909-1.29 2.747-1.022 2.747-1.022.546 1.372.202 2.386.1 2.638.64.696 1.028 1.587 1.028 2.675 0 3.83-2.339 4.673-4.566 4.92.359.307.678.915.678 1.846 0 1.332-.012 2.407-.012 2.734 0 .267.18.577.688.48 3.97-1.32 6.833-5.054 6.833-9.458C22 6.463 17.522 2 12 2Z"></path></svg>
          </a>
        </footer>
      </main>
    </div>
  )
}

