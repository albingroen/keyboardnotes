import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import Loading from "./components/presentation/loading";
import PrivateRoute from "./components/PrivateRoute";
import { loadNotes } from "./store/ducks/note/operation";
import Note from "./views/note";
import Login from "./views/login";
import Notes from "./views/notes";
import Profile from "./views/profile";
import { FETCH_NOTES_SUCCESS } from "./store/ducks/note/types";
import { WELCOME_NOTE } from "./lib/notes";

export default function App() {
  const { isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      if (isAuthenticated && !isLoading) {
        const token = await getAccessTokenSilently();
        dispatch(loadNotes({ token }));
      } else if (!isLoading) {
        dispatch({
          type: FETCH_NOTES_SUCCESS,
          payload: [WELCOME_NOTE]
        })
      }
    })();
  }, [dispatch, getAccessTokenSilently, isAuthenticated, isLoading]);

  if (isLoading) return <Loading />;

  return (
    <Switch>
      <Route exact path="/" component={Notes} />
      <Route exact path="/notes/:id" component={Note} />
      <PrivateRoute exact path="/profile" component={Profile} />
      {!isAuthenticated ? (
        <Route exact path="/login" component={Login} />
      ) : (
        <Redirect to="/" />
      )}
    </Switch>
  );
}
