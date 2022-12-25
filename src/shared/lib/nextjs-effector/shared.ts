import { Event } from 'effector'
import { PageEvent, StaticPageEvent } from './types'

export function isPageEvent(value: unknown): value is PageEvent {
  return Boolean(value)
}

export function isStaticPageEvent(value: unknown): value is StaticPageEvent {
  return Boolean(value)
}

/**
 * Casts an event union into a single event by removing empty event
 * (it's very hard to use event unions in Effector flow)
 */
export function assertStrict<T>(
  event: Event<T> | Event<void>
): asserts event is Event<T> {}
