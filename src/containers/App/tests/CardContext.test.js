import React from 'react';
import { shallow } from 'enzyme';

import CardProvider, { CardContext } from '../CardContext';

describe('CardContext', () => {
  let state;
  const wrapper = shallow(
    <CardProvider
      value={{
        state: state
      }}
    >
      <div>test</div>
    </CardProvider>
  );

  beforeEach(() => {
    state = {
      fullName: '',
      jobDescription: '',
      prefix: '',
      phoneNumber: '',
      email: '',
      website: '',
      address: ''
    };
  });
  it('should render with out craching', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have at least one children', () => {
    expect(wrapper.children().length).toBe(1);
  });

  it('should the provider have a value attribute', () => {
    expect(wrapper.prop('value').state).toEqual(state);
  });

  it('should the provider update the full name in the state', () => {
    const fullName = 'jose david';
    const key = 'fullName';
    wrapper.prop('value').handleChange(fullName, key);

    expect(wrapper.state(key)).toBe(fullName);
  });

  it('should the provider update the prefix in the state', () => {
    const prefix = '+57';
    const key = 'prefix';
    wrapper.prop('value').handlePrefix(prefix, key);

    expect(wrapper.state(key)).toBe(prefix);
  });

  it('should the provider reset the state', () => {
    const prefix = '+57';
    const state = {
      fullName: '',
      jobDescription: '',
      prefix: prefix,
      phoneNumber: '',
      email: '',
      website: '',
      address: ''
    };
    wrapper.prop('value').handleReset(prefix);

    expect(wrapper.state()).toEqual(state);
  });
});
