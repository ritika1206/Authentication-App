import Home from "./components/Home";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import { Redirect, Route, BrowserRouter } from "react-router-dom";
import { useAuth } from "./hooks/auth";
import { AuthContext } from "./context/auth-context"
 
function App() {
  const { token, login, logout, userId } = useAuth();

  let routes;

  // if(token) {
  //   routes = (
  //     <>
  //       <Route path="/home">
  //         <Home />
  //       </Route>
        
  //     </>
  //   )
  // }
  // else {
  //   routes = (
  //     <>
  //       <Route path="/" exact>
  //         <Redirect to="/login" />
  //       </Route>
  //       <Route path="/login">
  //         <LoginForm />
  //       </Route>
  //       <Route path="/signup">
  //         <SignupForm />
  //       </Route>
  //     </>
  //   )
  // }

  routes = (
      <>
        <Route path="/" exact>
           <Redirect to="/login" />
         </Route>
         <Route path="/login">
           <LoginForm />
         </Route>
         <Route path="/signup">
           <SignupForm />
         </Route>
         <Route path="/home">
           <Home />
         </Route>

      </>
  );

  return (
    <AuthContext.Provider
    value={{
      isLoggedIn: !!token,
      token: token,
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
