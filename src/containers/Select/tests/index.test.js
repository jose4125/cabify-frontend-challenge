import React from 'react';
import { shallow, mount } from 'enzyme';

import { Select } from '../index';

describe('Select Field', () => {
  const mockSetCountrySelected = jest.fn();

  const props = {
    isOpen: false,
    codes: [],
    countryCodeSelected: '+93',
    setCountrySelected: mockSetCountrySelected,
    counter: 0,
    optionSelectedElement: null
  };

  const wrapper = shallow(<Select {...props} />);

  it('should render with out crashing', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have a chevron', () => {
    expect(wrapper.find('.select__chevron').exists()).toBe(true);
  });

  it('should have a country code text', () => {
    expect(wrapper.find('.select__button').text()).toBe(
      props.countryCodeSelected
    );
  });

  it('should have the list container', () => {
    expect(wrapper.find('ul.dropdown__wrapper').exists()).toBe(true);
  });

  it('should not have an isOpen and focus classes', () => {
    expect(wrapper.prop('className')).not.toContain('isOpen focus');
  });
});

describe('Select Field mounted', () => {
  const mockSetCountrySelected = jest.fn();
  const mockHandleOpenCloseDropdown = jest.fn();
  const mockHandleClickOutside = jest.fn();
  let props;
  let wrapper;

  beforeEach(() => {
    props = {
      isOpen: true,
      codes: [
        {
          name: 'Afghanistan',
          dial_code: '+93',
          code: 'AF'
        },
        {
          name: 'Albania',
          dial_code: '+355',
          code: 'AL'
        },
        {
          name: 'Algeria',
          dial_code: '+213',
          code: 'DZ'
        }
      ],
      countryCodeSelected: '+93',
      setCountrySelected: mockSetCountrySelected,
      handleOpenCloseDropdown: mockHandleOpenCloseDropdown,
      handleClickOutside: mockHandleClickOutside,
      counter: 0,

      optionSelectedElement: null
    };

    wrapper = shallow(<Select {...props} />);
  });

  it('should call setCountrySelected when was mounted', () => {
    expect(mockSetCountrySelected).toHaveBeenCalledWith(
      props.countryCodeSelected
    );
    expect(mockSetCountrySelected).toHaveBeenCalledTimes(1);
  });

  it('should call handleOpenCloseDropdown when the button was clicked', () => {
    wrapper.find('.select__button').simulate('click');
    expect(mockHandleOpenCloseDropdown).toHaveBeenCalled();
  });

  it('should have an isOpen and focus classes', () => {
    expect(wrapper.prop('className')).toContain('isOpen focus');
  });

  it('should handle the down arrow key event', () => {
    wrapper.find('.select__button').simulate('keydown', { keyCode: 40 });
    expect(mockSetCountrySelected).toHaveBeenCalledWith(
      props.codes[1].dial_code
    );
  });
});
