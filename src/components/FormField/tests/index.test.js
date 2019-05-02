import React from 'react';
import { shallow } from 'enzyme';

import FormField from '../index';

describe('FormField', () => {
  const props = {
    name: 'fullname',
    stateName: 'fullName',
    label: 'Full name',
    name: 'fullname',
    label: 'Full name',
    value: '',
    isValid: false,
    touched: false,
    isDirty: false,
    isFocus: false
  };

  const wrapper = shallow(<FormField {...props} />);
  it('Should render with out crashing', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('Should have a Field component', () => {
    expect(wrapper.find('Field').exists()).toBe(true);
  });

  it('should be on default mode', () => {
    expect(wrapper.find('.formField-input').prop('className')).toContain(
      'formField-input col col12'
    );
  });

  it('should not have warning icon on default mode', () => {
    expect(wrapper.find('.warning').exists()).toBe(false);
  });

  it('should have a label', () => {
    expect(wrapper.find('label').text()).toBe(props.label);
  });

  describe('FormField classes', () => {
    it('should have active and focus classes when the field is foucs', () => {
      const props = {
        isValid: false,
        touched: true,
        isDirty: false,
        isFocus: true
      };

      const wrapper = shallow(<FormField {...props} />);
      expect(wrapper.find('.formField-input').prop('className')).toContain(
        'active focus'
      );
    });

    describe('FormField valid value', () => {
      const props = {
        isValid: true,
        touched: true,
        isDirty: true,
        isFocus: false
      };

      const wrapper = shallow(<FormField {...props} />);

      it('should have active class when the field has a value and was blurred', () => {
        expect(wrapper.find('.formField-input').prop('className')).toContain(
          'active'
        );
      });

      it('should not have warning icon when the field has a correct value', () => {
        expect(wrapper.find('.warning').exists()).toBe(false);
      });
    });

    describe('FormField invalid value', () => {
      const props = {
        isValid: false,
        touched: true,
        isDirty: true,
        isFocus: false
      };

      const wrapper = shallow(<FormField {...props} />);

      it('should have error class when the field has an incorrect value', () => {
        expect(wrapper.find('.formField-input').prop('className')).toContain(
          'active error'
        );
      });

      it('should have warning icon when the field has an incorrect value', () => {
        expect(wrapper.find('.warning').exists()).toBe(true);
      });
    });

    describe('FormField required', () => {
      const props = {
        isValid: false,
        touched: true,
        isDirty: false,
        isFocus: false
      };

      const wrapper = shallow(<FormField {...props} />);

      it('should have error class when the field has not a value and was blurred', () => {
        expect(wrapper.find('.formField-input').prop('className')).toContain(
          'error'
        );
      });

      it('should have warning icon when the field is required and it doesn`t have a value', () => {
        expect(wrapper.find('.warning').exists()).toBe(true);
      });
    });

    describe('FormField col', () => {
      const props = { col: '9' };
      const wrapper = shallow(<FormField {...props} />);
      it('should have a specific col number class', () => {
        expect(wrapper.find('.formField-input').prop('className')).toContain(
          `col${props.col}`
        );
      });
    });
  });
});
