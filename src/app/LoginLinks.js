'use client'

import Link from 'next/link'
import { useAuth } from '../hooks/auth'

const LoginLinks = () => {
    const { user } = useAuth({ middleware: 'guest' })
    const { logout } = useAuth()
    return (
        <>
            {user ? (
                <>
                <li className="nav_ul_li js-nav-ul-li">  
                <Link
                    href="/admin"
                >
                    ADMIN
                </Link>
                </li> 
                <li className="nav_ul_li js-nav-ul-li" onClick={logout}>
                    logout  
                </li>  
                </>
            ) : (
                <>
                    <li className="nav_ul_li js-nav-ul-li">  
                    <Link
                        href="/login"
                    >
                        Login
                    </Link>
                    </li>
                    <li className="nav_ul_li js-nav-ul-li">  
                    <Link
                        href="/register"
                    >
                        Register
                    </Link>
                    </li>
                </>
            )}
        </>
    )
}

export default LoginLinks
