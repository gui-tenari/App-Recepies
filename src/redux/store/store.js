import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import { loadState, saveState } from '../../utils/localStorageRedux';

import rootReducer from '../reducers';

const initialStoreState = loadState();

const store = createStore(
  rootReducer,
  initialStoreState,
  composeWithDevTools(applyMiddleware(thunk)),
);

store.subscribe(() => {
  saveState(store.getState());
});

export default store;
