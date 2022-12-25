// @ts-nocheck
import { createEvent as createEventNative, sample } from 'effector';
import { CreateFieldArrayParams, FieldArray } from '../ts';
import { getIn, removeFromInlineMap, setIn } from '../utils/object-manager';

const createFieldArray = <Values extends object = any>({
  form,
  domain,
}: CreateFieldArrayParams<Values>): FieldArray<Values> => {
  const { $values, $fieldsInline } = form;

  const createEvent = domain ? domain.createEvent : createEventNative;

  const remove = createEvent<{ fieldName: string; index: number }>(`hookForm_${form.name}_fieldArray_Remove`);
  const push = createEvent<{ fieldName: string; value: any | any[] }>(`hookForm_${form.name}_fieldArray_Push`);

  // const unshift = useMemo(() => createEvent<any>('hookForm_fieldArray_Unshift'), []);
  // const move = useMemo(() => createEvent<{ from: number; to: number }>('hookForm_fieldArray_Move'), []);
  // const insert = useMemo(() => createEvent<{ value: any; index: number }>('hookForm_fieldArray_Insert'), []);
  // const swap = useMemo(() => createEvent<{ from: number; to: number }>('hookForm_fieldArray_Swap'), []);

  $fieldsInline.on(remove, (fieldsInline, { index, fieldName }) =>
    removeFromInlineMap(fieldsInline, `${fieldName}.${index}`),
  );

  $values
    .on(remove, (values, { fieldName, index }) => {
      const newFields = getIn(values, fieldName, []).filter((_, i) => i !== index);
      return setIn(values, fieldName, newFields);
    })
    .on(push, (values, { fieldName, value }) => {
      const newFields = [...getIn(values, fieldName, [])];

      if (Array.isArray(value)) {
        newFields.push(...value);
      } else {
        newFields.push(value);
      }
      return setIn(values, fieldName, newFields);
    });

  // $values.on(unshift, (values, value) => {
  //   // todo implement for fieldsInline
  //   const newFields = [value, ...getIn(values, refName.current, [])];
  //   return setIn(values, refName.current, newFields);
  // });
  // $values.on(move, (values, { from, to }) => {
  //   // todo implement for fieldsInline
  //   const fields = getIn(values, refName.current, []);
  //   const newFields = [];
  //   let movingField = {};
  //   fields.forEach((field, i) => {
  //     if (from === i) {
  //       movingField = field;
  //     } else if (to === i) {
  //       newFields.push(field);
  //       newFields.push(movingField);
  //     } else {
  //       newFields.push(field);
  //     }
  //   });
  //   return setIn(values, refName.current, newFields);
  // });
  // $values.on(insert, (values, { index, value }) => {
  //   // todo implement for fieldsInline
  //   const fields = getIn(values, refName.current);
  //   const newFields = [];
  //   fields.forEach((field, i) => {
  //     if (index === i) {
  //       newFields.push(value);
  //       newFields.push(field);
  //     } else {
  //       newFields.push(field);
  //     }
  //   });
  //   return setIn(values, refName.current, newFields);
  // });
  //
  // $values.on(swap, (values, { from, to }) => {
  //   // todo implement for fieldsInline
  //   const fields = getIn(values, refName.current);
  //   const newFields = [];
  //   fields.forEach((field, i) => {
  //     if (from === i) {
  //       newFields.push(fields[to]);
  //     } else if (to === i) {
  //       newFields.push(fields[from]);
  //     } else {
  //       newFields.push(field);
  //     }
  //   });
  //   return setIn(values, refName.current, newFields);
  // });

  sample({
    source: form.$allFormState,
    clock: form.fieldInit,
    target: form.validateForm,
  });

  return {
    form,
    remove,
    push,
  };
};

export { createFieldArray };
