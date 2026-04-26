import { useCallback, useSyncExternalStore } from 'react'

export function useLocalStorage<T>(
  key: string,
  initial: T,
): [T, (v: T | ((p: T) => T)) => void] {
  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      const handler = (e: StorageEvent) => {
        if (e.key === key) onStoreChange()
      }
      window.addEventListener('storage', handler)
      return () => window.removeEventListener('storage', handler)
    },
    [key],
  )

  const getSnapshot = useCallback(() => {
    try {
      const raw = localStorage.getItem(key)
      if (raw == null) return initial
      return JSON.parse(raw) as T
    } catch {
      return initial
    }
  }, [key, initial])

  const value = useSyncExternalStore(subscribe, getSnapshot, getSnapshot)

  const setValue = useCallback(
    (v: T | ((p: T) => T)) => {
      const next = typeof v === 'function' ? (v as (p: T) => T)(getSnapshot()) : v
      localStorage.setItem(key, JSON.stringify(next))
      window.dispatchEvent(new StorageEvent('storage', { key }))
    },
    [key, getSnapshot],
  )

  return [value, setValue]
}
