import useSWR from 'swr'
import axios from '../lib/axios'
import { useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import NProgress from 'nprogress'

export const useAuth = ({ middleware, redirectIfAuthenticated } = {}) => {
    const router = useRouter()
    const params = useParams()

    const { data: user, error, mutate,isLoading } = useSWR(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user`,() =>
    
        axios
            .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user`,{
                withCredentials: true,
            })
            .then(res => res.data)
            .catch(error => {
                if (error.response.status !== 409) throw error
                router.push('/verify-email')
            })
    )
    
    const csrf = () => axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/sanctum/csrf-cookie`,{
        withCredentials: true,
    })

    const register = async ({ setErrors, ...props }) => {
        await csrf()
        setErrors([])
        NProgress.start()
        axios
            .post('/register', props,{
                withCredentials: true,
            })
            .then(() => mutate())
            .finally(() => {
                NProgress.done()
            })
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    const login = async ({ setErrors, setStatus, ...props }) => {
        await csrf()
        NProgress.start()
        setErrors([])
        setStatus(null)


        axios
            .post('/login', props, {
                withCredentials: true,
            })
            .then(() => {
                mutate()
            })
            .finally(() => {
                NProgress.done()
            })
            .catch(error => {
                if (error.response.status !== 422) throw error
                setErrors(error.response.data.errors)
            })
        }

    const forgotPassword = async ({ setErrors, setStatus, email }) => {
        await csrf()
        NProgress.start()
        setErrors([])
        setStatus(null)

        axios
            .post('/forgot-password', { email })
            .then(response => setStatus(response.data.status))
            .finally(() => {
                NProgress.done()
            })
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    const resetPassword = async ({ setErrors, setStatus, ...props }) => {
        await csrf()
        NProgress.start()
        setErrors([])
        setStatus(null)

        axios
            .post('/reset-password', { token: params.token, ...props })
            .then(response =>
                router.push('/login?reset=' + btoa(response.data.status)),
            )
            .finally(() => {
                NProgress.done()
            })
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    const resendEmailVerification = ({ setStatus }) => {
        NProgress.start()
        axios
            .post('/email/verification-notification')
            .then(response => setStatus(response.data.status))
            .finally(() => {
                NProgress.done()
            })
    }

    const logout = async () => {
        NProgress.start()
        if (!error) {
            await axios.post('/logout').then(() => mutate())            
            .finally(() => {
                NProgress.done()
            })
        }

        window.location.pathname = '/login'
    }
/*
    useEffect(() => {
        if (middleware === 'guest' && redirectIfAuthenticated && user)
            router.push(redirectIfAuthenticated)

        if (middleware === 'auth' && (user && !user.email_verified_at))
            router.push('/verify-email')
        
        if (
            window.location.pathname === '/verify-email' &&
            user?.email_verified_at
        )
            router.push(redirectIfAuthenticated)
        if (middleware === 'auth' && error) logout()
    }, [user, error])
*/
    useEffect(() => {
        if (isLoading) return // データ取得中は何もしない

        if (middleware === 'guest' && redirectIfAuthenticated && user) {
            router.push(redirectIfAuthenticated)
        }

        if (middleware === 'auth' && user && !user.email_verified_at) {
            router.push('/verify-email')
        }

        if (middleware === 'auth' && error) {
            logout()
        }

        if (
            window.location.pathname === '/verify-email' &&
            user?.email_verified_at
        ) {
            router.push(redirectIfAuthenticated)
        }
    }, [user, error, isLoading])

    return {
        user,
        register,
        login,
        forgotPassword,
        resetPassword,
        resendEmailVerification,
        logout,
    }
}
