import { useState } from "react"

export function useCarouselMemory(key, defaultValue = 0) {
  const storageKey = `carousel_${key}`
  const [value, setValue] = useState(() => {
    const saved = sessionStorage.getItem(storageKey)
    return saved !== null ? parseInt(saved, 10) : defaultValue
  })

  const set = (v) => {
    setValue(v)
    sessionStorage.setItem(storageKey, v)
  }

  return [value, set]
}