'use client'
import Link from 'next/link'
import {FaInstagram,FaThreads} from 'react-icons/fa6'
import {useState,useEffect } from 'react'
import { useAuth } from '../hooks/auth'


export default function GuestHeader(){
  //const { user } = useAuth({ middleware: 'guest' })
  const { user } = useAuth()
  const { logout } = useAuth()

  const [isShowMenu, setIsShowMenu] = useState(false)
  const toggle = ()=>{
    setIsShowMenu((prev)=>!prev)
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
                  <Link href="/ja">JP/</Link>
                  <Link href="/en">EN</Link>
                  {user && (
                      <>
                      <li className="nav_ul_li"><Link href="/admin">ADMIN</Link></li> 
                      <li className="nav_ul_li" onClick={logout}><button>logout</button></li>  
                      </>
                  )}
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

