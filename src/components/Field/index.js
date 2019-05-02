import React from 'react';

const Field = ({
  value,
  type,
  name,
  stateName,
  onHandleFocus,
  onHandleBlur,
  onHandleChange
}) => {
  return (
    <input
      autoComplete="off"
      type={type}
      name={name}
      value={value}
      onChange={event => onHandleChange(event.target.value, stateName)}
      onFocus={() => onHandleFocus(stateName)}
      onBlur={() => onHandleBlur(stateName)}
    />
  );
};

export default Field;
