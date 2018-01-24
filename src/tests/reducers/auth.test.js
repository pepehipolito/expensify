import authReducer from '../../reducers/auth';

test('stores user id on login action', () => {
  const uid = 'foobar';
  const state = authReducer({}, {type: 'LOGIN', uid});
  expect(state.uid).toBe(uid);
});

test('clears user id on logout action', () => {
  const initialState = {uid: 'foobar'}
  const state = authReducer(initialState, {type: 'LOGOUT'});
  expect(state).toEqual({});
});
