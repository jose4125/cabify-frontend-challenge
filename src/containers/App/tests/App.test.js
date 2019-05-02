import React from 'react';
import { shallow } from 'enzyme';

import { CardContext } from '../CardContext';
import App from '../App';
//import Card from '../../../components/Card';
//import CardForm from '../../CardForm';

describe('test', () => {
  const state = {
    fullName: '',
    jobDescription: '',
    prefix: '',
    phoneNumber: '',
    email: '',
    website: '',
    address: ''
  };

  const mockContext = {
    state: state
  };

  CardContext.Consumer = jest.fn(props => props.children({ ...mockContext }));

  const wrapper = shallow(<App />).dive();
  it('should render whit out crashing', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have a Card component', () => {
    expect(wrapper.find('Card').exists()).toBe(true);
  });

  it('should have a CardForm component', () => {
    expect(wrapper.find('CardForm').exists()).toBe(true);
  });
});
