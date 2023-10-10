import { createForm } from 'shared/form';
import { validation } from 'shared/lib/validation';

export const emailForm = createForm({
  initialValue: '',
  validation: validation.isEmail,
});

export const passwordForm = createForm({
  initialValue: '',
  validation: validation.isMinPassword,
});
