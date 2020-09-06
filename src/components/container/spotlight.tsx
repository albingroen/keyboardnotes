import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { message } from "antd";
import copy from "copy-to-clipboard";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useRouteMatch } from "react-router-dom";
import showdown from "showdown";
import { AppState } from "../../store";
import { toggleInterfaceItem } from "../../store/ducks/interface/operation";
import {
  addSelectedNote,
  resetSelectedNotes,
} from "../../store/ducks/note/actions";
import { createNote, deleteNote } from "../../store/ducks/note/operation";
import Spotlight from "../presentation/spotlight";

const converter = new showdown.Converter({ completeHTMLDocument: true });

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

  const { activeNote, selectedNotes, notes } = state.note;
  const note = notes.find(({ _id }) => _id === activeNote);

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
      case "Copy as Markdown":
        if (!note) return;

        copy(note.body);
        message.success("Markdown copied to clipboard!");
        break;
      case "Copy as HTML":
        if (!note) return;

        copy(converter.makeHtml(note.body));
        message.success("HTML copied to clipboard!");
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
          {
            label: "Copy as Markdown",
            value: "Copy as Markdown",
          },
          {
            label: "Copy as HTML",
            value: "Copy as HTML",
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
