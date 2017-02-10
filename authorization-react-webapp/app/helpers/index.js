import R from 'ramda';

export const hasProp = R.curry((prop, obj) => obj[prop] || false);
export const isTouched = hasProp('touched');
export const hasError = hasProp('error');
export const isTouchedAndHasError = R.curry(
  (fn1, fn2, obj) => fn1(obj) && fn2(obj)
)(isTouched, hasError);
export const isDisable = (...args) => R.map(a => a.error, args).filter(a => a === true).length > 0;
