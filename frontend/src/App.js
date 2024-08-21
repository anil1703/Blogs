import React, { Component, useContext, useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import LogSign from './Components/LogSign';
import Home from "./Components/Home";
import CheckingToken from "./Components/checkingToken";
import ReactContext from "./ReactContext";
import Cookies from 'js-cookie';
import CreateBlog from "./Components/CreateBlog";
import BlogsById from "./Components/BlogsById";
import './App.css';

const App = () => {
  const { isAllBlogs, changeToBlogsBy } = useContext(ReactContext);
  console.log(isAllBlogs);

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={LogSign} />
        <Route exact path="/" render={() => <CheckingToken component={Home} />} />
        <Route exact path="/createBlog" render={() => <CheckingToken component={CreateBlog} />} />
        <Route exact path="/blog/:id" render={() => <CheckingToken component={BlogsById} />} />
      </Switch>
    </BrowserRouter>
  );
};

const ReactContextProvider = ({ children }) => {
  const [isAllBlogs, setIsAllBlogs] = useState(() => {
    const cookieValue = Cookies.get('isAllBlogs');
    return cookieValue === 'true';
  });

  useEffect(() => {
    Cookies.set('isAllBlogs', isAllBlogs.toString());
  }, [isAllBlogs]);

  const changeToBlogsBy = (value) => {
    setIsAllBlogs(value);
  };

  return (
    <ReactContext.Provider value={{ isAllBlogs, changeToBlogsBy }}>
      {children}
    </ReactContext.Provider>
  );
};

const AppWrapper = () => {
  return (
    <ReactContextProvider>
      <App />
    </ReactContextProvider>
  );
};

export default AppWrapper;