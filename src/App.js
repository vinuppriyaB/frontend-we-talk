import "./App.css";
import { Route, Switch } from "react-router-dom";
import ChatPage from "./pages/ChatPage";

import Login from "./component/login/Login";
import Register from "./component/register/Register";
import ChatProvider from "./Context/chatContext/ChatProvider";

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/register">
          <Register />
        </Route>
        <Route exact path="/">
          <Login />
        </Route>

        <Route exact path="/chats">
          <ChatProvider>
            <ChatPage />
          </ChatProvider>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
