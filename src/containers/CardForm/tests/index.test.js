import React from 'react';
import { shallow, mount } from 'enzyme';
import fetchMock from 'fetch-mock';

import CardForm from '../index';
import Option from '../../Option/index';
import mockData from '../../../../public/data/countryCodes.json';
import { wrap } from 'module';

describe('CardFrom', () => {
  const mockHandleChange = jest.fn();
  const mockHandlePrefix = jest.fn();
  const mockHandleReset = jest.fn();

  // handleChange,
  // handlePrefix,
  // handleReset

  let form = {
    fullName: {
      valid: false,
      touched: false,
      focus: false,
      dirty: false,
      validation: {
        required: true,
        onlyString: true
      }
    },
    jobDescription: {
      valid: false,
      touched: false,
      focus: false,
      dirty: false,
      validation: {
        required: true
      }
    },
    phoneNumber: {
      valid: false,
      touched: false,
      focus: false,
      dirty: false,
      validation: {
        required: true,
        minLength: 10,
        maxLength: 10,
        onlyNumbers: true
      }
    },
    email: {
      valid: false,
      touched: false,
      focus: false,
      dirty: false,
      validation: {
        required: true,
        email: true
      }
    },
    website: {
      touched: false,
      focus: false,
      dirty: false
    },
    address: {
      valid: false,
      touched: false,
      focus: false,
      dirty: false,
      validation: {
        required: true
      }
    },
    formIsValid: false
  };

  const context = {
    state: {
      fullName: '',
      jobDescription: '',
      prefix: '',
      phoneNumber: '',
      email: '',
      website: '',
      address: ''
    },
    handleReset: mockHandleReset
  };
  const wrapper = shallow(<CardForm context={context} />);

  it('should render with out creashing', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should call handleReset when the form was submitted', () => {
    wrapper.find('.form').simulate('submit', { preventDefault() {} });
    expect(mockHandleReset).toHaveBeenCalledWith(
      wrapper.state().countryCodeSelected
    );
  });

  it('should the submit button be disable', () => {
    expect(wrapper.find('.button').prop('className')).toContain('disabled');
  });

  it('should the submit button be enable', () => {
    form.formIsValid = true;
    wrapper.setState({ form });
    expect(wrapper.find('.button').prop('className')).not.toContain('disabled');
  });

  it('should set the countryCodeSelected', () => {
    wrapper.instance().handleCountryCodeSelected('+39');
    expect(wrapper.state().countryCodeSelected).toBe('+39');
  });

  it('should toggle the isOpen value', () => {
    wrapper.instance().handleOpenCloseDropdown();
    expect(wrapper.state().isOpen).toBe(true);
    wrapper.instance().handleOpenCloseDropdown();
    expect(wrapper.state().isOpen).toBe(false);
  });

  it('should set the isOpen value to false', () => {
    wrapper.setState({ isOpen: true });
    wrapper.instance().handleOpenCloseDropdown(false);
    expect(wrapper.state().isOpen).toBe(false);
  });

  it('should set the counter value', () => {
    wrapper.setState({
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
      ]
    });
    wrapper.instance().setIndexSelected('+355');
    expect(wrapper.state().counter).toBe(1);
  });

  it('should close the select if handleCloseClickOutside is true', () => {
    wrapper.instance().handleClickOutside();
    expect(wrapper.state().isOpen).toBe(false);
  });

  it('should keep open the select if handleCloseClickOutside is false', () => {
    wrapper.setState({ handleCloseClickOutside: false });
    wrapper.instance().handleClickOutside();
    expect(wrapper.state().isOpen).toBe(false);
  });
});

describe('CardFrom Mounted', () => {
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
  const wrapper = shallow(<CardForm context={context} />);

  it('should get the data when is mounted', async () => {
    fetchMock.mock('/data/countryCodes.json', mockData);
    const data = await fetch('/data/countryCodes.json');
    const response = await data.json();
    expect(response).toEqual(mockData);
    wrapper.setState({ codes: response.codes });
    expect(wrapper.state().codes).toEqual(response.codes);
  });
});
