'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import useSWR from 'swr'

const fetcher = (url) =>
  fetch(url, { credentials: 'include' }).then((res) => {
    if (!res.ok) throw new Error('Not authenticated')
    return res.json()
  })

export default function RequireAuth({ children }) {
  const router = useRouter()
  const { data, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user`, fetcher)
  const [redirecting, setRedirecting] = useState(false) // リダイレクト状態を管理

  useEffect(() => {
    if (isLoading || redirecting) return // ローディング中やリダイレクト中は何もしない

    if (error || !data) {
      setRedirecting(true) // リダイレクト開始フラグを設定
      router.push('/login') // ログインページにリダイレクト
    }
  }, [data, error, isLoading, redirecting, router])

  if (isLoading || redirecting || !data) return <p>Loading...</p> // ローディング中またはリダイレクト中はローディングメッセージ

  return <>{children}</>
}
