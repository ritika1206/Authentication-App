import Home from "./components/Home";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import { Redirect, Route, BrowserRouter, Switch } from "react-router-dom";
import { useAuth } from "./hooks/auth";
import { AuthContext } from "./context/auth-context"
import { useState } from "react";
 
function App() {
  const { token, login, logout, userId } = useAuth();

  const [ authToken, setAuthToken ] = useState(null);

  const authTokenHandler = (token) => {
    setAuthToken(token);
  }


  let routes;

  if(authToken) {
    routes = (
      <>
        <Route path="/home">
          <Home setToken = {authTokenHandler} />
        </Route>
        
      </>
    )
  }
  else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Redirect to="/login" />
        </Route>
        <Route path="/login">
          <LoginForm setToken = {authTokenHandler} />
        </Route>
        <Route path="/signup">
          <SignupForm />
        </Route>
        <Route>
          <Redirect to="/login" />
        </Route>
      </Switch>
    )
  }

  // routes = (
  //     <>
  //       <Route path="/" exact>
  //          <Redirect to="/login" />
  //        </Route>
  //        <Route path="/login">
  //          <LoginForm />
  //        </Route>
  //        <Route path="/signup">
  //          <SignupForm />
  //        </Route>
  //        <Route path="/home">
  //          <Home />
  //        </Route>

  //     </>
  // );

  return (
    <AuthContext.Provider
    value={{
      isLoggedIn: !!token,
      token: authToken,
      userId: userId,
      login: login,
      logout: logout
    }}
    >
    <BrowserRouter>
      <main>{routes}</main>
    </BrowserRouter>
  </AuthContext.Provider>
  );
}

export default App;
