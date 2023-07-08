import { withField } from '../field';
import { Form } from './form';
import { Input } from './input';

const Field = {
  Input: withField(Input),
};

export { Form, Field };
