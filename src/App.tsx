import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import Loading from "./components/presentation/loading";
import PrivateRoute from "./components/PrivateRoute";
import { loadNotes } from "./store/ducks/note/operation";
import Login from "./views/login";
import Note from "./views/note";
import Notes from "./views/notes";
import Profile from "./views/profile";

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
        <Route exact path="/" component={Login} />
      )}
      <PrivateRoute exact path="/profile" component={Profile} />
      <PrivateRoute exact path="/notes/:id" component={Note} />
    </Switch>
  );
}
