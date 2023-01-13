import { createToggler } from './createToggler';

describe('createToggler', () => {
  test('open event sets isOpen to true', () => {
    const toggler = createToggler();
    toggler.open();
    expect(toggler.$isOpen.getState()).toBe(true);
  });

  test('toggle event inverts isOpen', () => {
    const toggler = createToggler();
    toggler.toggle();
    expect(toggler.$isOpen.getState()).toBe(true);
    toggler.toggle();
    expect(toggler.$isOpen.getState()).toBe(false);
  });

  test('createToggler accepts default value', () => {
    const toggler = createToggler(true);
    expect(toggler.$isOpen.getState()).toBe(true);
  });
});
