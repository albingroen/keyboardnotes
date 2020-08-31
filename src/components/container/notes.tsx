import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { AppState } from "../../store";
import {
  setActiveNote,
  addSelectedNote,
  removeSelectedNote,
} from "../../store/ducks/note/actions";
import {
  createNote,
  deleteNote,
  browseNotes,
} from "../../store/ducks/note/operation";
import Notes from "../presentation/notes";
import DeleteNotesModal from "./delete-notes-modal";
import { toggleInterfaceItem } from "../../store/ducks/interface/operation";

export default function NotesContainer() {
  const state = useSelector((state: AppState) => state);
  const [deleteNotesIsOpen, setDeleteNotesIsOpen] = useState<boolean>(false);
  const { notes, fetchNotesStatus, activeNote, selectedNotes } = state.note;
  const { getAccessTokenSilently, isAuthenticated, user } = useAuth0();
  const dispatch = useDispatch();
  const history = useHistory();

  const { spotlight } = state.interface;

  useEffect(() => {
    const handleKeyDown = async (e: KeyboardEvent) => {
      if (spotlight.isOpen) return;

      const token = isAuthenticated
        ? await getAccessTokenSilently()
        : undefined;

      switch (e.keyCode) {
        case 74: // 'j'
        case 40: // 'down'
          dispatch(toggleInterfaceItem("shortcuts", false));
          return dispatch(browseNotes({}, "down"));
        case 75: // 'k'
        case 38: // 'up'
          dispatch(toggleInterfaceItem("shortcuts", false));
          return dispatch(browseNotes({}, "up"));
        case 13: // 'enter'
          e.preventDefault();

          if (deleteNotesIsOpen) {
            if (selectedNotes.length) {
              setDeleteNotesIsOpen(false);
              return selectedNotes.forEach((id) => {
                dispatch(deleteNote({ token }, id));
                dispatch(removeSelectedNote(id));
              });
            }

            setDeleteNotesIsOpen(false);
            return dispatch(deleteNote({ token }, activeNote));
          } else {
            return history.push(`/notes/${activeNote}`);
          }
        case 67: // 'c'
          e.preventDefault();
          dispatch(toggleInterfaceItem("shortcuts", false));
          return dispatch(createNote({ token, history }));
        case 69: // 'e'
          dispatch(toggleInterfaceItem("shortcuts", false));
          return setDeleteNotesIsOpen(true);
        case 88: // 'x'
          dispatch(toggleInterfaceItem("shortcuts", false));
          return selectedNotes.includes(activeNote)
            ? dispatch(removeSelectedNote(activeNote))
            : dispatch(addSelectedNote(activeNote));
        case 27: // 'esc'
          if (deleteNotesIsOpen) {
            return setDeleteNotesIsOpen(false);
          }

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
    activeNote,
    deleteNotesIsOpen,
    dispatch,
    getAccessTokenSilently,
    history,
    isAuthenticated,
    selectedNotes,
    spotlight.isOpen,
  ]);

  return (
    <React.Fragment>
      <DeleteNotesModal visible={deleteNotesIsOpen} />

      <Notes
        user={user}
        notes={notes}
        onNoteClick={(id) => history.push(`/notes/${id}`)}
        isLoading={fetchNotesStatus === "loading"}
        selectedNotes={selectedNotes}
        activeNote={activeNote}
        createNote={async () => {
          const token = isAuthenticated
            ? await getAccessTokenSilently()
            : undefined;
          dispatch(createNote({ token, history }));
        }}
        onMouseEnter={(id) => {
          dispatch(setActiveNote(id));
        }}
      />
    </React.Fragment>
  );
}
