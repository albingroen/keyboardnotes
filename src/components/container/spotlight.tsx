import React from "react";
import Spotlight from "../presentation/spotlight";
import { useDispatch, useSelector } from "react-redux";
import { toggleInterfaceItem } from "../../store/ducks/interface/operation";
import { createNote, deleteNote } from "../../store/ducks/note/operation";
import { useAuth0 } from "@auth0/auth0-react";
import { useHistory } from "react-router-dom";
import {
  addSelectedNote,
  resetSelectedNotes,
} from "../../store/ducks/note/actions";
import { AppState } from "../../store";

export default function SpotlightContainer() {
  const state = useSelector((state: AppState) => state);
  const { getAccessTokenSilently, logout } = useAuth0();
  const dispatch = useDispatch();
  const history = useHistory();

  const { activeNote, selectedNotes } = state.note;

  const onSelect = async (event: string) => {
    const token = await getAccessTokenSilently();

    switch (event) {
      case "Compose":
        dispatch(createNote({ token, history }));
        break;
      case "Select":
        dispatch(addSelectedNote(activeNote));
        break;
      case "Archive (Delete)":
        if (selectedNotes.length) {
          selectedNotes.forEach((note) => {
            dispatch(deleteNote({ token }, note));
          });
          dispatch(resetSelectedNotes());
        } else {
          dispatch(deleteNote({ token }, activeNote));
        }
        break;
      case "Sign out (Log out)":
        logout();
    }

    dispatch(toggleInterfaceItem("spotlight", false));
  };

  return (
    <Spotlight
      options={[
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
        { label: "Sign out (Log out)", value: "Sign out (Log out)" },
      ]}
      onClose={() => dispatch(toggleInterfaceItem("spotlight"))}
      onSelect={onSelect}
    />
  );
}
