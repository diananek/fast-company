import React from "react";
import Users from "./layouts/users";
import NavBar from "./components/ui/navBar";
import { Switch, Route } from "react-router-dom";
import Login from "./layouts/login";
import Main from "./layouts/main";

const App = () => {
  return (
    <div>
      <NavBar />
      <Switch>
        <Route path="/users/:userId?/:type?" component={Users} />
        <Route path="/login/:type?" component={Login} />
        <Route path="/" component={Main} />
      </Switch>
    </div>
  );
};
export default App;
