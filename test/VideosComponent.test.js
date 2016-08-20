import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import Videos from '../client/components/videos';

describe('Component: Videos', () => {

  it('exists', () => {
    let wrapper = shallow(<Videos />);
    expect(wrapper.length).to.eql(1);
  });

});
