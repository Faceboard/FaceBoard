import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import Message from '../client/components/message';

describe('Component: Message', () => {

  it('exists', () => {
    let wrapper = shallow(<Message />);
    expect(wrapper.length).to.eql(1);
  });


});
