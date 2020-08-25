import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { AppState } from "../../store";
import {
  setActiveNote,
  addSelectedNote,
  removeSelectedNote,
} from "../../store/ducks/note/actions";
import { createNote, deleteNote } from "../../store/ducks/note/operation";
import Notes from "../presentation/notes";

export default function NotesContainer() {
  const state = useSelector((state: AppState) => state);
  const { notes, fetchNotesStatus, activeNote, selectedNotes } = state.note;
  const { getAccessTokenSilently } = useAuth0();
  const dispatch = useDispatch();
  const history = useHistory();

  const { spotlight } = state.interface;

  useEffect(() => {
    const handleKeyDown = async (e: KeyboardEvent) => {
      if (spotlight.isOpen) return;

      const token = await getAccessTokenSilently();

      const getNextNote = (dir: "up" | "down") => {
        return (
          notes[
            notes.findIndex((n) => n._id === activeNote) +
              (dir === "up" ? -1 : 1)
          ]?._id || activeNote
        );
      };

      switch (e.keyCode) {
        case 74: // 'j'
        case 40: // 'down'
          return dispatch(setActiveNote(getNextNote("down")));
        case 75: // 'k'
        case 38: // 'up'
          return dispatch(setActiveNote(getNextNote("up")));
        case 13: // 'enter'
          e.preventDefault();
          return history.push(`/notes/${activeNote}`);
        case 67: // 'c'
          return dispatch(createNote({ token, history }));
        case 69: // 'e'
          if (selectedNotes.length) {
            return selectedNotes.forEach((id) => {
              dispatch(deleteNote({ token }, id));
              dispatch(removeSelectedNote(id));
            });
          }

          return dispatch(deleteNote({ token }, activeNote));
        case 88: // 'x'
          return selectedNotes.includes(activeNote)
            ? dispatch(removeSelectedNote(activeNote))
            : dispatch(addSelectedNote(activeNote));
        case 27: // 'esc'
          if (selectedNotes.length) {
            return selectedNotes.forEach((id) => {
              dispatch(removeSelectedNote(id));
            });
          }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [
    notes,
    history,
    activeNote,
    selectedNotes,
    getAccessTokenSilently,
    dispatch,
    spotlight.isOpen,
  ]);

  return (
    <Notes
      notes={notes}
      onNoteClick={(id) => history.push(`/notes/${id}`)}
      isLoading={fetchNotesStatus === "loading"}
      selectedNotes={selectedNotes}
      activeNote={activeNote}
      onMouseEnter={(id) => {
        dispatch(setActiveNote(id));
      }}
    />
  );
}
