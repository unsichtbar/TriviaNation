import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import reducer from "./reducer";
import io from "socket.io-client";
import socketMiddleware from "./middlewares/socket";
let loggerMiddleware = createLogger();
const configureStore = persistedState => {
  const store = createStore(
    reducer,
    persistedState,
    applyMiddleware(
      thunkMiddleware,
      socketMiddleware(
        io.connect(process.env.SOCKET_URL || "http://localhost:8080")
      ),
      loggerMiddleware
    )
  );
  return store;
};
export default configureStore;