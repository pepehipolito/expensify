//NOTE: We cannot import moment the regular way (import moment from 'moment';) because we are mocking
// it. We need to use require.requireActual to be able to use the original moment library.
const moment = require.requireActual('moment');

export default (timestamp = 0) => {
  return moment(timestamp);
};
