import React, { useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import GLOBALS from "../globals";
import Loader from "../components/Loader";

import LandingPage from "../pages/LandingPage";

// Auth
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import ConfirmEmail from "../pages/Auth/ConfirmEmail";
import ResetPassword from "../pages/Auth/ResetPassword";
import ForgotPassword from "../pages/Auth/ForgotPassword";

// User
import Profile from "../pages/User/Profile";

export default function Main() {
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    checkLogin();
    // eslint-disable-next-line
  }, []);

  const checkLogin = async () => {
    try {
      const token = localStorage.getItem("test");
      if (!token) {
        setLoading(false);
        return;
      }

      const data = await GLOBALS.API({
        uri: GLOBALS.Constants.GET_PROFILE,
        token: token,
      });
      dispatch({
        type: GLOBALS.ActionTypes.LOGIN,
        user: data.user,
        token: token,
      });
      setLoading(false);
    } catch (err) {
      localStorage.removeItem("token");
      console.log(err);
    }
  };

  return (
    <>
      {store.loading && <Loader.AbsoluteLinear />}
      {loading ? (
        <Loader.CenterProgress />
      ) : (
        <Switch>
          <Route exact path="/" component={LandingPage} />
          {/* Auth */}
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/forgot-password" component={ForgotPassword} />
          <Route exact path="/reset-password" component={ResetPassword} />
          <Route exact path="/confirm-email" component={ConfirmEmail} />
          {/* User */}
          {store.auth && <Route exact path="/profile" component={Profile} />}
          <Redirect from="*" to="/" />
        </Switch>
      )}
    </>
  );
}
