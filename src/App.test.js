import React from 'react';
import Component from './App';
import configureMockStore from 'redux-mock-store';
import ReactTestUtils from 'react-dom/test-utils';
import { Provider } from 'react-redux';

const generateComponent = (initialStore = {}) => {
  const mockStore = configureMockStore([]);
  const store = mockStore(initialStore);
  return ReactTestUtils.renderIntoDocument(
    <Provider store={store}><Component/></Provider>
  );
};
it('renders without crashing', () => {
  const component = ReactTestUtils.findRenderedComponentWithType(generateComponent(), Component);
  expect(component).toBeDefined();
});
it('receives props from the store', () => {
  const component = ReactTestUtils.findRenderedComponentWithType(generateComponent({error: {message: 'test'}}), Component);
  expect(component.selector.props.error).toEqual({message: 'test'});
});
