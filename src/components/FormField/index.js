import React from 'react';

import Field from '../Field';
import warning from '../../images/warning.svg';

const FormField = ({
  name,
  label,
  col,
  isValid,
  touched,
  isDirty,
  isFocus,
  ...props
}) => {
  let active = (isFocus && touched) || (touched && isDirty);
  const focus = isFocus;
  const error =
    (isValid !== undefined &&
      isValid === false &&
      touched &&
      isFocus === false) ||
    (isValid !== undefined && isValid === false && touched && isDirty);
  return (
    <div
      className={`formField-input ${active ? 'active ' : ''}${
        focus ? 'focus ' : ''
      }${error ? 'error ' : ''}col ${col ? `col${col}` : 'col12'}`}
    >
      <div className="input">
        <Field {...props} />
        {error && <img className="warning" src={warning} alt="warning" />}
        <label htmlFor={name}>{label}</label>
      </div>
    </div>
  );
};

export default FormField;
