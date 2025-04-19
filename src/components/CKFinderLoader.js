// components/CKFinderLoader.tsx
'use client'
import { useEffect } from 'react'

export default function CKFinderLoader() {
  useEffect(() => {
    if (typeof window !== 'undefined' && !window.CKFinder) {
      const script = document.createElement('script')
      script.src = 'http://localhost:8000/js/ckfinder/ckfinder.js' // Laravel 側のURL
      script.onload = () => {
        if (window.CKFinder) {
          window.CKFinder.config({ connectorPath: 'http://localhost:8000/ckfinder/connector' })
        }
      }
      document.body.appendChild(script)
    }
  }, [])

  return null
}
