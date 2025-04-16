import { Josefin_Sans, Lexend } from 'next/font/google'
const lex = Lexend({ subsets: ['latin'] })
const sans = Josefin_Sans({ subsets: ['latin'] })

export default function Topbar({ pageName, toggleIsVisible, avatar }: { pageName: string, toggleIsVisible: boolean, avatar: string }) {
    
    return (
        <header className="bg-white shadow">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex items-center flex justify-between">
                <div className="flex">
                    {toggleIsVisible ?
                        <label htmlFor="my-drawer" className="btn drawer-button">
                            <svg
                                className="swap-off fill-current"
                                xmlns="http://www.w3.org/2000/svg"
                                width="32"
                                height="32"
                                viewBox="0 0 512 512">
                                <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
                            </svg>
                        </label>
                        : <></>}
                    <h1 className={`${sans.className} text-3xl font-bold px-3`}>{pageName}</h1>
                </div> 
                <div className="avatar">
                    <div className="w-[60px] rounded-full">
                    <img src={avatar || 'https://images.pexels.com/photos/1870376/pexels-photo-1870376.jpeg'}  />
                    </div>
                </div>
            </div>
        </header>
    )
}
