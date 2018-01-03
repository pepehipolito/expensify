// This sets up enzyme for the app so we don't have to import it all the time. It is not "magic" so
// it needs some setup in a file called 'jest.config.json', to be created in the root folder of the app.
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({
  adapter: new Adapter()
});
