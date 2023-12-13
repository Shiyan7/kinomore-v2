import { useUnit } from 'effector-react';
import type { TogglerInstance } from './types';

export function useToggler({ $isOpen, open, close, toggle }: TogglerInstance) {
  return useUnit({ isOpen: $isOpen, open, close, toggle });
}
