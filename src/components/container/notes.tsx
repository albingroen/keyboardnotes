import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { AppState } from "../../store";
import { setActiveNote } from "../../store/ducks/note/actions";
import { createNote, deleteNote } from "../../store/ducks/note/operation";
import Notes from "../presentation/notes";

export default function NotesContainer() {
  const { notes, fetchNotesStatus, activeNote } = useSelector(
    (state: AppState) => state.note
  );
  const { getAccessTokenSilently } = useAuth0();
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const handleKeyDown = async (e: KeyboardEvent) => {
      const token = await getAccessTokenSilently();

      switch (e.keyCode) {
        case 74: // 'j'
        case 40: // 'down'
          return dispatch(
            setActiveNote(
              notes[notes.findIndex((n) => n._id === activeNote) + 1]?._id ||
                activeNote
            )
          );
        case 75: // 'k'
        case 38: // 'up'
          return dispatch(
            setActiveNote(
              notes[notes.findIndex((n) => n._id === activeNote) - 1]?._id ||
                activeNote
            )
          );
        case 13: // 'enter'
          return history.push(`/notes/${activeNote}`);
        case 67: // 'c'
          return dispatch(createNote({ token, history }));
        case 69: // 'e'
          return dispatch(deleteNote({ token }, activeNote));
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [activeNote, history, notes, dispatch, getAccessTokenSilently]);

  return (
    <Notes
      onNoteClick={(id) => history.push(`/notes/${id}`)}
      isLoading={fetchNotesStatus === "loading"}
      onMouseEnter={setActiveNote}
      activeNote={activeNote}
      notes={notes}
    />
  );
}
