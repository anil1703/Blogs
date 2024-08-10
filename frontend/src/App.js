import { BrowserRouter, Switch, Route } from "react-router-dom";
import LogSign from './Components/LogSign';
import Home from "./Components/Home";
import CheckingToken from "./Components/checkingToken";
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={LogSign} />
        <CheckingToken
          path="/" component={Home} />
    
      </Switch>
    </BrowserRouter>
  );
}

export default App;
