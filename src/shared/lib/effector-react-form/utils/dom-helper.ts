// @ts-nocheck
const isEvent = (candidate) => !!(candidate && candidate.stopPropagation && candidate.preventDefault);

const getSelectedValues = (options) => {
  const result = [];
  if (options) {
    for (const option of options) {
      if (option.selected) {
        // @ts-ignore
        result.push(option.value);
      }
    }
  }
  return result;
};

export const getValue = (event, isReactNative?) => {
  if (isEvent(event)) {
    if (!isReactNative && event.nativeEvent && event.nativeEvent.text !== undefined) {
      return event.nativeEvent.text;
    }
    if (isReactNative && event.nativeEvent !== undefined) {
      return event.nativeEvent.text;
    }
    const detypedEvent = event;
    const {
      target: { type, value, checked, files },
      dataTransfer,
    } = detypedEvent;
    if (type === 'checkbox') {
      return !!checked;
    }
    if (type === 'file') {
      return files || (dataTransfer && dataTransfer.files);
    }
    if (type === 'select-multiple') {
      return getSelectedValues(event.target.options);
    }
    return value;
  }
  return event;
};
