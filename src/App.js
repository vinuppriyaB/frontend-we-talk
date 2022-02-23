import "./App.css";
import { Route, Switch } from "react-router-dom";
import ChatPage from "./pages/ChatPage";

import Login from "./component/login/Login";
import Register from "./component/register/Register";

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
          <ChatPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
