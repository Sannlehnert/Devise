import { useEffect, useState } from 'react'

export default function useFirstScroll() {
  const [hasScrolled, setHasScrolled] = useState(false)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const key = 'devise-visited-v1'
    const hasVisited = localStorage.getItem(key)

    if (hasVisited) {
      setHasScrolled(true)
      return
    }

    const handleScroll = () => {
      setHasScrolled(true)
      setShowModal(true)
      localStorage.setItem(key, 'true')
      window.removeEventListener('scroll', handleScroll)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return { hasScrolled, showModal, setShowModal }
}