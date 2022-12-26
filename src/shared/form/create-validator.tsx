/* eslint-disable import/no-unresolved */
import { object, type ValidationError } from "yup";
import { createNameHelper, type FormValidateParams } from "effector-react-form";

export function createObjectValidator<Values extends object, Meta>(obj: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [K in keyof Values]?: any;
}) {
  const schema = object(obj);
  const nameHelper = createNameHelper<Values>();
  // const nameHelper = createNameHelper<typeof schema.fields>();
  const validate = ({ values }: FormValidateParams<Values, Meta>) => {
    const errors: { [key: string]: string } = {};

    try {
      schema.validateSync(values, { strict: true, abortEarly: false });
    } catch (err) {
      const errorsArr = (err as ValidationError).inner;
      if (errorsArr.length) {
        errorsArr.forEach((error) => {
          if (error.path !== undefined) {
            errors[nameHelper.getStr(error.path as keyof Values)] = error.message;
          }
        });
      }
    }

    return errors;
  };

  return validate;
}
