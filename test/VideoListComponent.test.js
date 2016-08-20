import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import VideoList from '../client/components/videoList';

describe('Component: Video List', () => {

  it('exists', () => {
    let wrapper = shallow(<VideoList />);
    expect(wrapper.length).to.eql(1);
  });

});
