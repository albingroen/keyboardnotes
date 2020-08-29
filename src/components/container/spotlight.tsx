import React from "react";
import Spotlight from "../presentation/spotlight";
import { useDispatch, useSelector } from "react-redux";
import { toggleInterfaceItem } from "../../store/ducks/interface/operation";
import { createNote, deleteNote } from "../../store/ducks/note/operation";
import { useAuth0 } from "@auth0/auth0-react";
import { useHistory, useRouteMatch } from "react-router-dom";
import {
  addSelectedNote,
  resetSelectedNotes,
} from "../../store/ducks/note/actions";
import { AppState } from "../../store";

export default function SpotlightContainer() {
  const dispatch = useDispatch();
  const match = useRouteMatch();
  const history = useHistory();

  const state = useSelector((state: AppState) => state);
  const {
    getAccessTokenSilently,
    isAuthenticated,
    logout,
    loginWithRedirect,
  } = useAuth0();

  const { activeNote, selectedNotes } = state.note;

  const onSelect = async (event: string) => {
    const token = isAuthenticated ? await getAccessTokenSilently() : undefined;

    switch (event) {
      case "Compose":
        dispatch(createNote({ token, history }));
        break;
      case "Select":
        dispatch(addSelectedNote(activeNote));
        break;
      case "Archive (Delete)":
        if (match.path === "/notes/:id") {
          dispatch(deleteNote({ token }, (match as any).params.id));
          history.push("/");
        } else if (selectedNotes.length) {
          selectedNotes.forEach((note) => {
            dispatch(deleteNote({ token }, note));
          });
          dispatch(resetSelectedNotes());
        } else {
          dispatch(deleteNote({ token }, activeNote));
        }
        break;
      case "Sign in (Log in)":
        loginWithRedirect();
        break;
      case "Sign out (Log out)":
        logout();
        break;
    }

    dispatch(toggleInterfaceItem("spotlight", false));
  };

  const getOptions = () => {
    return match.path === "/notes/:id"
      ? [
          {
            label: "Compose",
            value: "Compose",
          },
          {
            label: "Archive (Delete)",
            value: "Archive (Delete)",
          },
          isAuthenticated
            ? { label: "Sign out (Log out)", value: "Sign out (Log out)" }
            : { label: "Sign in (Log in)", value: "Sign in (Log in)" },
        ]
      : [
          {
            label: "Compose",
            value: "Compose",
            command: "c",
          },
          {
            label: "Select",
            value: "Select",
            command: "x",
          },
          {
            label: "Archive (Delete)",
            value: "Archive (Delete)",
            command: "e",
          },
          isAuthenticated
            ? { label: "Sign out (Log out)", value: "Sign out (Log out)" }
            : { label: "Sign in (Log in)", value: "Sign in (Log in)" },
        ];
  };

  return (
    <Spotlight
      onClose={() => dispatch(toggleInterfaceItem("spotlight"))}
      options={getOptions()}
      onSelect={onSelect}
    />
  );
}
