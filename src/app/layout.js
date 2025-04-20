import { Murecho } from 'next/font/google'
import '@/css/global.css'
import '@/css/global.scss'
import '@/css/reset.css'
import '@/css/ckeditor.scss'
import GuestHeader from '../components/Header'
import Footer from '@/components/Footer'
import NextTopLoader from 'nextjs-toploader'



const murecho = Murecho({
    weight: '400',
    subsets: ['latin'],
    display: 'swap',
  })

const RootLayout = ({ children }) => { 
console.log(murecho)
    return (
        <html lang="jp" className={murecho.className}>
             <head />
            <body className="antialiased">
                <NextTopLoader />
                    <GuestHeader />
                    <main className='main'>
                    {children}
                    </main>
                    <Footer />

            </body>
        </html>
    )
}

export const metadata = {
    title: 'junsan14｜ホテル業からIT、そしてルワンダ協力隊へ',
    icons: {
        icon: '/favicon.png',
      },
}

export default RootLayout
