import { useEffect, useRef } from 'react'

// https://stackoverflow.com/a/53446665
export function usePrevious (value) {
  const ref = useRef()
  useEffect(() => {
    ref.current = value
  })

  return ref.current
}
