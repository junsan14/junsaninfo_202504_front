'use client'
import {FaInstagram,FaThreads} from 'react-icons/fa6'
import {useState,useEffect } from 'react'
import { useAuth } from '../hooks/auth'
import {Link,useRouter, usePathname} from '@/i18n/navigation'
import { useLocale } from "next-intl"
import { routing } from "@/i18n/routing"


export default function GuestHeader(){
  //const { user } = useAuth({ middleware: 'guest' })
  const { user } = useAuth()
  const { logout } = useAuth()
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()


  const [isShowMenu, setIsShowMenu] = useState(false)
  const toggle = ()=>{
    setIsShowMenu((prev)=>!prev)
  }

  const handleLocaleChange = (e) => {
    const newLocale = e.currentTarget.dataset.locale
    console.log(pathname)
   router.push(pathname, { locale: newLocale })
  }
  useEffect(() => {
    if (isShowMenu) {
      document.body.classList.add('noscroll')
      return () => {
        document.body.classList.remove('noscroll')
      }
    }
  }, [isShowMenu])
    return(
        <header className='header'>
            <div className={`toggle ${isShowMenu ? "show":""}`}  onClick={toggle}>
                <span />
                <span />
                <span />
            </div> 
            <nav className={`nav ${isShowMenu ? "show":""}`} >
                <ul className="nav_ul" onClick={toggle}>
                  <li className="nav_ul_li"><Link href="/">HOME</Link></li>
                  <li className="nav_ul_li"><Link href="/about">ABOUT</Link></li>
                  <li className="nav_ul_li"><Link href="/blog">BLOG</Link></li> 
                  <li className="nav_ul_li"><Link href="/docs">DOCS</Link></li>
                  {user && (
                      <>
                      <li className="nav_ul_li"><Link href="/admin">ADMIN</Link></li> 
                      <li className="nav_ul_li" onClick={logout}><button>logout</button></li>  
                      </>
                  )}
                </ul>

                <ul className='nav_lang' onClick={toggle}>
                    {routing.locales.map(loc => (
                      <li
                        className={`nav_lang_list ${loc === locale ? 'active':''}`}
                        disabled={loc === locale}
                        key={loc}
                        data-locale={loc}
                        onClick={handleLocaleChange}
                      >
                          {loc === "ja" ? "JP":"EN"}
                      
                      </li>
                    ))} 
                </ul>  
                <div className="nav_sns">
                <a href="https://www.threads.net/@junsan_junsan14/" target="_blank" rel="noopener noreferrer">
                    <FaThreads className='nav_sns_icon'/>
                </a>
                <a href="https://www.instagram.com/junsan_junsan14" rel="noopener noreferrer" target='_blank'>
                    <FaInstagram className='nav_sns_icon'/>
                </a>
                </div>

            </nav>        
        </header>
    )
}

