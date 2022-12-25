interface Env {
  isClient: boolean
  isServer: boolean
}

export const env: Env = {
  isClient: typeof window !== 'undefined',
  isServer: typeof window === 'undefined',
}
