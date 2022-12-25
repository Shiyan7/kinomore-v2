import { Scope } from 'effector'

interface State {
  clientScope: Scope | null
}

export const state: State = {
  clientScope: null,
}
