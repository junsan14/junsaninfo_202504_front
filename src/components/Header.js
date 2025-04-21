'use client'
import Link from 'next/link'
import {FaInstagram,FaThreads} from 'react-icons/fa6'
import $ from 'jquery'
import {useEffect } from 'react'
import { useAuth } from '../hooks/auth'

export default function GuestHeader(){
  //const { user } = useAuth({ middleware: 'guest' })
  const { user } = useAuth()
  const { logout } = useAuth()
  useEffect(() => {
    const $nav = $('.js-nav')
    const $toggleBtn = $('.js-toggle')

    // 注意: user の有無にかかわらず、表示された要素にだけイベントをつける
    const bindEvents = () => {
      const $naviList = $('.js-nav-ul-li')

      $toggleBtn.off('click').on('click', () => {
        if ($nav.hasClass('show')) {
          $nav.removeClass('show')
          $toggleBtn.removeClass('show')
          $('body').removeClass('noscroll')
        } else {
          $nav.addClass('show')
          $toggleBtn.addClass('show')
          $('body').addClass('noscroll')
        }
      })

      $naviList.off('click').on('click', () => {
        $nav.removeClass('show')
        $toggleBtn.removeClass('show')
        $('body').removeClass('noscroll')
      })
    }

    // 少し遅らせて確実にDOM構築後に実行（userが切り替わって再レンダリングされた後）
    const timeout = setTimeout(bindEvents, 100)

    return () => clearTimeout(timeout)
  }, [user]) // userが変更された時に再バインド
  //console.log(user)
    return(
        <header className='header'>
            <div className="toggle js-toggle" id="js-toggle">
                <span />
                <span />
                <span />
            </div> 
            <nav className="nav js-nav" id="js-nav">
                <ul className="nav_ul">
                  <li className="nav_ul_li js-nav-ul-li"><Link href="/">HOME</Link></li>
                  <li className="nav_ul_li js-nav-ul-li"><Link href="/about">ABOUT</Link></li>
                  <li className="nav_ul_li js-nav-ul-li"><Link href="/blog">BLOG</Link></li>     
                  {user && (
                      <>
                      <li className="nav_ul_li js-nav-ul-li"><Link href="/admin">ADMIN</Link></li> 
                      <li className="nav_ul_li js-nav-ul-li" onClick={logout}><button>logout</button></li>  
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

