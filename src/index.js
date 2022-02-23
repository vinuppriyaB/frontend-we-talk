import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import ChatProvider from "./Context/chatContext/ChatProvider";

import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <ChatProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ChatProvider>,
  document.getElementById("root")
);
