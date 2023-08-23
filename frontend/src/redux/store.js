import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

import rootReducer from "./reducers/index";
import { Provider } from "react-redux";

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
});

const DataProvider = ({children}) => {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}

export default DataProvider;