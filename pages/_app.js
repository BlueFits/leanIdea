import '../styles/globals.css';
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";

import userReducer from "../store/reducers/user";

const rootReducer = combineReducers({ 
  userReducer,
});

const store = createStore(rootReducer);

export default function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
};