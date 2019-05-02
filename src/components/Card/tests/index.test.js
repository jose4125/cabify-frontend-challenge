import React from 'react';
import { shallow } from 'enzyme';

import Card from '../index';

describe('card', () => {
  const props = {
    fullName: '',
    jobDescription: '',
    prefix: '+93',
    phoneNumber: '',
    email: '',
    website: '',
    address: ''
  };

  const wrapper = shallow(<Card info={props} />);
  it('should render with out crashing', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have a cabify logo', () => {
    expect(wrapper.find('.businessCard-badge-logo').exists()).toBe(true);
  });

  it('should have a title', () => {
    expect(wrapper.find('.title-main').exists()).toBe(true);
  });

  it('should the title be a h1', () => {
    expect(wrapper.find('.title-main').type()).toEqual('h1');
  });

  it('should the title have a copy', () => {
    expect(wrapper.find('.title-main').text().length).toBeGreaterThan(0);
  });

  it('should have an empty full name', () => {
    expect(wrapper.find('.businessCard-cardFront-title').text()).toBe('');
  });

  it('should have an empty subtitle', () => {
    expect(wrapper.find('.businessCard-cardFront-subtitle').text()).toBe('');
  });

  it('should have a businessCard phone', () => {
    expect(wrapper.find('.businessCard-icon-phone').text()).toBe(
      `${props.prefix} ${props.phoneNumber}`
    );
  });

  it('should have an empty email', () => {
    expect(wrapper.find('.businessCard-icon-email').text()).toBe('');
  });

  it('should have an empty website', () => {
    expect(wrapper.find('.businessCard-icon-website').text()).toBe('');
  });

  it('should have an empty address', () => {
    expect(wrapper.find('.businessCard-icon-address').text()).toBe('');
  });

  describe('card with props values', () => {
    const props = {
      fullName: 'jhon doe',
      jobDescription: 'backend',
      prefix: '+57',
      phoneNumber: '3192345687',
      email: 'jhondoe@test.com',
      website: 'jhondoe.com',
      address: 'jhondoe street'
    };

    const wrapper = shallow(<Card info={props} />);

    it('should render a full name', () => {
      expect(wrapper.find('.businessCard-cardFront-title').text()).toBe(
        `${props.fullName}`
      );
    });

    it('should render a subtitle', () => {
      expect(wrapper.find('.businessCard-cardFront-subtitle').text()).toBe(
        `${props.jobDescription}`
      );
    });

    it('should render a businessCard phone', () => {
      expect(wrapper.find('.businessCard-icon-phone').text()).toBe(
        `${props.prefix} ${props.phoneNumber}`
      );
    });

    it('should render an email', () => {
      expect(wrapper.find('.businessCard-icon-email').text()).toBe(
        `${props.email}`
      );
    });

    it('should render a website', () => {
      expect(wrapper.find('.businessCard-icon-website').text()).toBe(
        `${props.website}`
      );
    });

    it('should render a address', () => {
      expect(wrapper.find('.businessCard-icon-address').text()).toBe(
        `${props.address}`
      );
    });
  });
});
