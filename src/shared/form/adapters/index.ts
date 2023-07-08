import { Input } from './input';
import { Form } from './form';
import { withField } from '../field';

const Field = {
  Input: withField(Input),
};

export { Form, Field };
