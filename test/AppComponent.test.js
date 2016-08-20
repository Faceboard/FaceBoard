
import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import App from '../client/components/app';


describe('Component: App', () => {

  it('exists', () => {
    let wrapper = shallow(<App />);
    expect(wrapper.length).to.eql(1);
  });

  it('has signin button', () => {
    let wrapper = shallow(<App />);

    expect(wrapper.contains(<button className="btn btn-default">Sign Up!</button>)).to.eql(true);
  });

  it('has signup button', () => {
    let wrapper = shallow(<App />);

    expect(wrapper.contains(<button className="btn btn-default">Sign In!</button>)).to.eql(true);
  });

  it('has a link to sign up route', () => {
    let wrapper = shallow(<App />);

    expect(wrapper.find('Link').first().prop('to')).to.eql('/signup');
  });

  it('has a link to sign in route', () => {
    let wrapper = shallow(<App />);

    expect(wrapper.find('Link').last().prop('to')).to.eql('/signin');
  });


});
