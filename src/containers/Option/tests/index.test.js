import React from 'react';
import { shallow, mount } from 'enzyme';

import Option from '../index';

describe('Option', () => {
  const mockHandleOpenCloseDropdown = jest.fn();
  const mockSetCountrySelected = jest.fn();
  const mockHandleOptionselectedElement = jest.fn();
  let props;
  let prevProps;
  let wrapper;

  beforeEach(() => {
    props = {
      key: 'United State',
      index: 2,
      counter: 0,
      countryCode: { dial_code: '+34', name: 'United State', code: 'US' },
      countryCodeSelected: '+34',
      handleOpenCloseDropdown: mockHandleOpenCloseDropdown,
      setCountrySelected: mockSetCountrySelected,
      handleOptionselectedElement: mockHandleOptionselectedElement
    };

    prevProps = {
      counter: 0
    };

    wrapper = shallow(<Option {...props} />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('should render with out crashing', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should call handleOptionselectedElement when is mounted', () => {
    props.counter = 2;
    wrapper = mount(<Option {...props} />);

    expect(mockHandleOptionselectedElement).toHaveBeenCalledTimes(1);
  });

  it('should call handleOptionselectedElement when is update', () => {
    props.counter = 1;
    props.index = 1;
    wrapper.instance().componentDidUpdate(prevProps);

    expect(mockHandleOptionselectedElement).toHaveBeenCalledTimes(1);
  });

  it('should have a selected class', () => {
    expect(wrapper.prop('className')).toContain('selected');
  });

  it('should have a span with country code flag class', () => {
    expect(wrapper.find('.flag').prop('className')).toContain(
      props.countryCode.code
    );
  });

  it('should have a country name text', () => {
    expect(wrapper.find('.dropdown__country-name').text()).toBe(
      props.countryCode.name
    );
  });

  it('should have a country dial code text', () => {
    expect(wrapper.text()).toBe(
      `${props.countryCode.name}${props.countryCode.dial_code}`
    );
  });

  it('should call setCountrySelected and handleOpenCloseDropdown when is clicked', () => {
    wrapper.simulate('click');
    expect(mockSetCountrySelected).toHaveBeenCalledWith(
      props.countryCode.dial_code
    );

    expect(mockSetCountrySelected).toHaveBeenCalledTimes(1);

    expect(mockHandleOpenCloseDropdown).toHaveBeenCalledWith(false);
    expect(mockHandleOpenCloseDropdown).toHaveBeenCalledTimes(1);
  });
});

describe('Option no selected', () => {
  let props;
  let wrapper;

  beforeEach(() => {
    props = {
      key: 'United State',
      index: 2,
      counter: 0,
      countryCode: { dial_code: '+34', name: 'United State', code: 'US' },
      countryCodeSelected: '+93'
    };

    wrapper = shallow(<Option {...props} />);
  });

  it('should not have a selected class', () => {
    expect(wrapper.prop('className')).not.toContain('selected');
  });
});
