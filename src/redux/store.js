import {combineReducers, createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import navReducer from './navRedux';
import productsReducer from './productsRedux';
import orderingReducer from './orderingRedux';

// define initial state and shallow-merge initial data
const initialState = {
  nav: {
    currentView: '',
    drawerOpen: false,
  },
  products: {
    loading: {
      active: false,
      error: false,
    },
    data: [],
  },
  ordering: {
    table: '',
    orderTime: {},
    notes: '',
    menu: {
      cake: {},
      breakfast: {
        params: {
          coffee: ''
        }
      },
      pizza: {
        params: {
          sauce: '',
          toppings: {
            olives: false,
            redPeppers: false,
            greenPeppers: false,
            mushrooms: false,
            basil: false,
            salami: false,
          },
          crust: ''
        }
      },
      salad: {
        params: {
          ingredients: {
            cucumber: false,
            tomatoes: false,
            olives: false,
            feta: false,
            cheese: false,
            herbs: false,
            pepper: false,
          }
        }
      }
    }
  },
};

// define reducers
const reducers = {
  nav: navReducer,
  products: productsReducer,
  ordering: orderingReducer,
};

// add blank reducers for initial state properties without reducers
Object.keys(initialState).forEach(item => {
  if (typeof reducers[item] == 'undefined') {
    reducers[item] = (statePart = null) => statePart;
  }
});

const combinedReducers = combineReducers(reducers);

// create store
const store = createStore(
  combinedReducers,
  initialState,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
);

export default store;