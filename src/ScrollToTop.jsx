import { useEffect, useRef } from "react"
import { useLocation } from "react-router-dom"

export default function ScrollToTop() {
const { pathname } = useLocation()
const prevPathname = useRef(pathname)
const scrollPositions = useRef({})

useEffect(() => {
const handleScroll = () => {
    scrollPositions.current[prevPathname.current] = window.scrollY
}

window.addEventListener("scroll", handleScroll, { passive: true })
return () => window.removeEventListener("scroll", handleScroll)
}, [])

useEffect(() => {
const isLogoClick = window.__scrollToTop === true
const savedY = scrollPositions.current[pathname]

if (isLogoClick) {
    window.scrollTo(0, 0)
    window.__scrollToTop = false
} else if (savedY !== undefined) {
    // Restore saved scroll position (back/forward navigation)
    requestAnimationFrame(() => window.scrollTo(0, savedY))
} else {
    // New page visit (not back/forward), scroll to top
    window.scrollTo(0, 0)
}

prevPathname.current = pathname
}, [pathname])

return null
}