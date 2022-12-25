import { fork, serialize } from 'effector'
import { Provider } from 'effector-react/scope'
import { NextComponentType } from 'next'
import { AppContext, AppProps } from 'next/app'
import React, { useRef } from 'react'
import { INITIAL_STATE_KEY } from './constants'
import { env } from './env'
import { state } from './state'

interface Values {
  [sid: string]: any
}

export function useScope(values: Values = {}) {
  const valuesRef = useRef<Values | null>(null)

  if (env.isServer) {
    return fork({ values })
  }

  /*
   * Client first render
   * Create the new Scope and save it globally
   * We need it to be accessable inside getInitialProps
   */
  if (!state.clientScope) {
    state.clientScope = fork({ values })
    valuesRef.current = values
  }

  /*
   * Values have changed, most likely it's happened on the user navigation
   * Create the new Scope from the old one and save it as before
   */
  if (values !== valuesRef.current) {
    const currentValues = serialize(state.clientScope)
    const nextValues = Object.assign({}, currentValues, values)

    state.clientScope = fork({ values: nextValues })
    valuesRef.current = values
  }

  return state.clientScope
}

export function withEffector(App: NextComponentType<AppContext, any, any>) {
  return function EnhancedApp(props: AppProps<any>) {
    const { [INITIAL_STATE_KEY]: initialState, ...pageProps } = props.pageProps

    const scope = useScope(initialState)

    return (
      <Provider value={scope}>
        <App {...props} pageProps={pageProps} />
      </Provider>
    )
  }
}
