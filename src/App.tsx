import React, { useEffect } from "react";
import "./App.css";
import LoginButton from "./components/LoginButton";
import { Switch, Route } from "react-router-dom";
import Profile from "./views/profile";
import { useAuth0 } from "@auth0/auth0-react";
import PrivateRoute from "./components/PrivateRoute";
import Notes from "./views/notes";
import Note from "./views/note";
import Loading from "./components/presentation/loading";
import { useDispatch } from "react-redux";
import { loadNotes } from "./store/ducks/note/operation";

export default function App() {
  const { isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      if (isAuthenticated && !isLoading) {
        const token = await getAccessTokenSilently();
        dispatch(loadNotes({ token }));
      }
    })();
  }, [dispatch, getAccessTokenSilently, isAuthenticated, isLoading]);

  if (isLoading) return <Loading />;

  return (
    <Switch>
      {isAuthenticated ? (
        <PrivateRoute exact path="/" component={Notes} />
      ) : (
        <Route exact path="/" component={LoginButton} />
      )}
      <PrivateRoute exact path="/profile" component={Profile} />
      <PrivateRoute exact path="/notes/:id" component={Note} />
    </Switch>
  );
}
