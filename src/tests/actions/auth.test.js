import {login, logout} from '../../actions/auth';

test('it creates a login action object', () => {
  const uid = 'foobar';
  expect(login(uid)).toEqual({
    type: 'LOGIN',
    uid
  });
});

test('it creates a logout action object', () => {
  expect(logout()).toEqual({type: 'LOGOUT'});
});
