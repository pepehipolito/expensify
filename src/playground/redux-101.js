import { createStore } from 'redux';

// Action generators: functions that return action objects.
// Check out the parameters. We assign an empty object in case no argument is passed. If the arguments
// is passed, then we default the value of 'incrementBy' to 1, in case that attribute is not passed.
// So if no argument is passed, the default empty object is assigned, and since the default emty objects
// does not contain the attribute 'incrementBy', we end up with a default of 1.
const incrementCount = ({incrementBy = 1} = {}) => (
  {
    type: 'INCREMENT',
    incrementBy
  }
);

const decrementCount = ({decrementBy = 1} = {}) => (
  {
    type: 'DECREMENT',
    decrementBy
  }
);

const setCount = ({count}) => (
  {
    type: 'SET',
    count
  }
);

const resetCount = () => (
  {
    type: 'RESET'
  }
);


// Reducers:
// 1. Are pure functions.
// 2. Never change state or action.
const countReducer = (state = { count: 0 }, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return {
        count: state.count + action.incrementBy
      };
      break;
    case 'DECREMENT':
      return {
        count: state.count - action.decrementBy
      };
      break;
    case 'SET':
      return {
        count: action.count
      };
      break;
    case 'RESET':
      return {
        count: 0
      };
      break;
    default:
      return state;
  }
};

const store = createStore(countReducer);

// subscribe() lets us listen for changes to the state.
// subscribe() returns a function that can be called to unsubscribe.
const unsubscribe = store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch(incrementCount({incrementBy: 5}));
store.dispatch(incrementCount());

store.dispatch(resetCount());

store.dispatch(decrementCount());
store.dispatch(decrementCount({decrementBy: 11}));

store.dispatch(setCount({count: 101}));

// Calling the function to unsubscribe from listening to state changes here.
unsubscribe();
