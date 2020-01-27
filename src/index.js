import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux"; // Provider : 리액트 프로젝트에서 리덕스를 적용할 수 있게 해줌
import { createStore } from "redux";

import rootReducer from "./modules"; // export default 이므로 폴더만 불러와도 됨

const store = createStore(rootReducer); // 스토어 생성

ReactDOM.render(
  // wrap App with Provider and set store props
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
