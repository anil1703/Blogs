import { BrowserRouter, Switch, Route } from "react-router-dom";
import LogSign from './Components/LogSign';
import Home from "./Components/Home";
import CheckingToken from "./Components/checkingToken";
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={LogSign} />
        <CheckingToken exact path="/" component={Home} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
