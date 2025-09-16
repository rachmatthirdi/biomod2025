"use client"

import { useCallback, useRef } from 'react'

export function useLongPress(
  onLongPress: (element: HTMLElement) => void,
  onRelease: () => void,
  delay: number = 1000
) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const elementRef = useRef<HTMLElement | null>(null)

  const start = useCallback((event: React.MouseEvent<HTMLElement> | React.TouchEvent<HTMLElement>) => {
    elementRef.current = event.currentTarget as HTMLElement
    timeoutRef.current = setTimeout(() => {
      if (elementRef.current) {
        onLongPress(elementRef.current)
      }
    }, delay)
  }, [onLongPress, delay])

  const clear = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    onRelease()
  }, [onRelease])

  return {
    onMouseDown: start,
    onMouseUp: clear,
    onMouseLeave: clear,
    onTouchStart: start,
    onTouchEnd: clear,
  }
}
