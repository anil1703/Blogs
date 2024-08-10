import { Redirect,Route } from "react-router-dom";
import Cookies from "js-cookie";

const CheckingToken = (props) => {
  const token = Cookies.get('jwt_token');

  if (!token) {
    return <Redirect to="/login" />;
  }

  return <Route {...props}/>;
};

export default CheckingToken;
