import { ThunkAction } from "redux-thunk";
import { AppActions } from "..";
import { AppState } from "../..";
import {
  fetchNotes,
  fetchNotesSuccess,
  fetchNotesError,
  addNote,
  addNoteSuccess,
  addNoteError,
  updateNote,
  updateNoteSuccess,
  updateNoteError,
  removeNote,
  removeNoteSuccess,
  removeNoteError,
} from "./actions";
import {
  getNotes as _getNotes,
  createNote as _createNote,
  updateNote as _updateNote,
  deleteNote as _deleteNote,
} from "../../../http/note";
import { IRequestContext } from "../../../types";

export const loadNotes = (
  requestContext: IRequestContext
): ThunkAction<void, AppState, unknown, AppActions> => async (dispatch) => {
  dispatch(fetchNotes());

  try {
    const notes = await _getNotes(requestContext);
    dispatch(fetchNotesSuccess(notes));
  } catch (err) {
    dispatch(fetchNotesError(err.message));
  }
};

export const createNote = (
  requestContext: IRequestContext
): ThunkAction<void, AppState, unknown, AppActions> => async (dispatch) => {
  dispatch(addNote());

  try {
    const note = await _createNote(requestContext);
    dispatch(addNoteSuccess(note));

    requestContext.history?.push(`/notes/${note._id}`);
  } catch (err) {
    dispatch(addNoteError(err.message));
  }
};

export const patchNote = (
  requestContext: IRequestContext,
  id: string,
  values: any
): ThunkAction<void, AppState, unknown, AppActions> => async (
  dispatch,
  getState
) => {
  const note = getState().note.notes.find((n) => n._id === id);

  const newNote = {
    ...note,
    ...values,
  };

  console.log(newNote);

  dispatch(updateNote());
  dispatch(updateNoteSuccess(newNote));

  try {
    await _updateNote(requestContext, id, values);
  } catch (err) {
    dispatch(updateNoteError(err.message));
  }
};

export const deleteNote = (
  requestContext: IRequestContext,
  id: string
): ThunkAction<void, AppState, unknown, AppActions> => async (dispatch) => {
  dispatch(removeNote());
  dispatch(removeNoteSuccess(id));

  try {
    await _deleteNote(requestContext, id);
  } catch (err) {
    dispatch(removeNoteError(err.message));
  }
};
