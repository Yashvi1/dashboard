import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { thunk as reduxThunk } from 'redux-thunk';
import usersReducer from '../features/users/redux/usersReducer'; // classic reducer file

const rootReducer = combineReducers({
  users: usersReducer,
  // add more reducers here if needed
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(reduxThunk)) // for Redux DevTools
);
