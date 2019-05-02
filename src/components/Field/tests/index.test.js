import React from 'react';
import { shallow } from 'enzyme';

import Field from '../index';

describe('Field', () => {
  const mockOnHandleChange = jest.fn();
  const mockOnHandleFocus = jest.fn();
  const mockOnHandleBlur = jest.fn();
  const context = {
    state: {
      fullName: '',
      jobDescription: '',
      prefix: '',
      phoneNumber: '',
      email: '',
      website: '',
      address: ''
    }
  };

  const props = {
    type: 'text',
    name: 'fullname',
    value: '',
    stateName: 'fullName',
    onHandleFocus: mockOnHandleFocus,
    onHandleBlur: mockOnHandleBlur,
    onHandleChange: mockOnHandleChange
  };

  const wrapper = shallow(<Field {...props} />);

  it('should render with out crashing', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have an input tag', () => {
    expect(wrapper.find('input').exists()).toBe(true);
  });

  it('should the input have a type', () => {
    expect(wrapper.find('input').prop('type')).toBe(props.type);
  });

  it('should the input have a name', () => {
    expect(wrapper.find('input').prop('name')).toBe(props.name);
  });

  it('should the input have an empty value', () => {
    expect(wrapper.find('input').prop('value')).toBe('');
  });

  it('should the input call onHandleFocus', () => {
    const fullName = 'john doe';
    wrapper.find('input').simulate('focus');
    expect(mockOnHandleFocus).toHaveBeenCalled();
  });

  it('should the input call handleChange', () => {
    const fullName = 'john doe';
    wrapper.find('input').simulate('change', { target: { value: fullName } });
    expect(mockOnHandleChange).toHaveBeenCalledWith(fullName, props.stateName);
  });

  it('should the input call onHandleBlur with stateName', () => {
    wrapper.find('input').simulate('blur');
    expect(mockOnHandleBlur).toHaveBeenCalledWith(props.stateName);
  });

  describe('update context Field', () => {
    const props = {
      type: 'text',
      name: 'fullname',
      stateName: 'fullName',
      value: 'john doe',
      onHandleFocus: mockOnHandleFocus,
      onHandleBlur: mockOnHandleBlur,
      onHandleChange: mockOnHandleChange
    };

    const wrapper = shallow(<Field {...props} />);

    it('should the input have a value', () => {
      expect(wrapper.find('input').prop('value')).toBe(props.value);
    });
  });
});
