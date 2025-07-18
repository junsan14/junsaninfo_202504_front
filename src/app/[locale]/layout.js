import {NextIntlClientProvider, hasLocale} from 'next-intl'
import {notFound} from 'next/navigation'
import {routing} from '@/i18n/routing'
import { Murecho } from 'next/font/google'
import '@/css/global.css'
import '@/css/global.scss'
import '@/css/reset.css'
import '@/css/ckeditor.scss'
import GuestHeader from '@/components/Header'
import Footer from '@/components/Footer'
import NextTopLoader from 'nextjs-toploader'
import { GoogleTagManager } from '@next/third-parties/google'

 
const murecho = Murecho({
    weight: '400',
    subsets: ['latin'],
    display: 'swap',
  })


export default async function LocaleLayout({
  children,
  params
}) {
  // Ensure that the incoming `locale` is valid
  const {locale} = await params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }
 
  return (
       <html lang={locale} className={murecho.className}>
            <head />
            <body className="antialiased">
              {!!process.env.GOOGLE_ANALYTICS_ID && (
                <GoogleTagManager gtmId={process.env.GOOGLE_TAG_MANAGER_ID} />

              )}
              <NextIntlClientProvider>
                    <NextTopLoader />
                    <GuestHeader />
                    <main className='main'>
                      {children}
                    </main>
                    <Footer />
              </NextIntlClientProvider>
            </body>
      </html>
  )
}

export const metadata = {
    title: 'junsan14｜ホテル業からIT、そしてルワンダ協力隊へ',
    description: '元ホテルマン・Webエンジニアが、ルワンダで挑戦する社会貢献活動とスキルの記録を発信。キャリアと学びを一体化したサイト"',
    openGraph: {
        title: 'junsan14｜ホテル業からIT、そしてルワンダ協力隊へ',
        description: '元ホテルマン・Webエンジニアが、ルワンダで挑戦する社会貢献活動とスキルの記録を発信。キャリアと学びを一体化したサイト',
        url: 'https://junsan.info',
        siteName: 'junsan14｜ホテル業からIT、そしてルワンダ協力隊へ',
        images: [
          {
            url: 'https://example.com/og.png',
            width: 1200,
            height: 630,
          },
        ],
        locale: 'ja_JP',
        type: 'website',
      },
    icons: {
        icon: '/favicon.png',
      },
}