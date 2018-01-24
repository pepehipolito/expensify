import React from 'react';
import { shallow } from 'enzyme';
import {LoginPage} from '../../components/LoginPage';

test('renders LoginPage', () => {
  const wrapper = shallow(<LoginPage />);
  expect(wrapper).toMatchSnapshot();
});

test('calls startLogin on button click', () => {
  const startLogin = jest.fn();
  const wrapper = shallow(<LoginPage onClick={startLogin} />);
  wrapper.find('button').simulate();
  expect(startLogin).toHaveBeenCalled();
});
