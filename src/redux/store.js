import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { thunk as reduxThunk } from 'redux-thunk';
import usersReducer from '../features/users/redux/usersReducer'; 

const rootReducer = combineReducers({
  users: usersReducer,
  // add more reducers here when needed
});

//Thunk as middleware to handle async functions
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(reduxThunk))
);
