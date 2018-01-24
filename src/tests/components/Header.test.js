import React from 'react';
import { shallow } from 'enzyme';
import {Header} from '../../components/Header';

test('renders Header', () => {
  // const renderer = new ReactShallowRenderer();
  // renderer.render(<Header />);
  // expect(renderer.getRenderOutput()).toMatchSnapshot();
  const wrapper = shallow(<Header startLogout={() => {}}/>);
  // expect(wrapper.find('h1').text()).toBe('Expensify');
  expect(wrapper).toMatchSnapshot();
});

test('calls startLogout on button click', () => {
  const startLogout = jest.fn();
  const wrapper = shallow(<Header onClick={startLogout} />);
  wrapper.find('button').simulate();
  expect(startLogout).toHaveBeenCalled();
});
