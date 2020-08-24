import {
  FETCH_NOTES,
  FETCH_NOTES_SUCCESS,
  FETCH_NOTES_ERROR,
  IFetchNotesAction,
  IFetchNotesSuccessAction,
  IFetchNotesErrorAction,
  IAddNoteAction,
  IAddNoteSuccessAction,
  IAddNoteErrorAction,
  IUpdateNoteAction,
  IUpdateNoteSuccessAction,
  IUpdateNoteErrorAction,
  ADD_NOTE,
  ADD_NOTE_SUCCESS,
  ADD_NOTE_ERROR,
  UPDATE_NOTE,
  UPDATE_NOTE_SUCCESS,
  UPDATE_NOTE_ERROR,
  REMOVE_NOTE,
  REMOVE_NOTE_SUCCESS,
  REMOVE_NOTE_ERROR,
  IRemoveNoteAction,
  IRemoveNoteSuccessAction,
  IRemoveNoteErrorAction,
  ISetActiveNoteAction,
  SET_ACTIVE_NOTE,
  IAddSelectedNoteAction,
  ADD_SELECTED_NOTE,
  IRemoveSelectedNoteAction,
  REMOVE_SELECTED_NOTE,
  IResetSelectedNotesAction,
  RESET_SELECTED_NOTES,
} from "./types";
import { INote } from "../../../types";

// FETCH

export function fetchNotes(): IFetchNotesAction {
  return {
    type: FETCH_NOTES,
  };
}
export function fetchNotesSuccess(notes: INote[]): IFetchNotesSuccessAction {
  return {
    type: FETCH_NOTES_SUCCESS,
    payload: notes,
  };
}
export function fetchNotesError(error: string): IFetchNotesErrorAction {
  return {
    type: FETCH_NOTES_ERROR,
    payload: error,
  };
}

// ADD

export function addNote(): IAddNoteAction {
  return {
    type: ADD_NOTE,
  };
}
export function addNoteSuccess(note: INote): IAddNoteSuccessAction {
  return {
    type: ADD_NOTE_SUCCESS,
    payload: note,
  };
}
export function addNoteError(error: string): IAddNoteErrorAction {
  return {
    type: ADD_NOTE_ERROR,
    payload: error,
  };
}

// UPDATE

export function updateNote(): IUpdateNoteAction {
  return {
    type: UPDATE_NOTE,
  };
}
export function updateNoteSuccess(note: INote): IUpdateNoteSuccessAction {
  return {
    type: UPDATE_NOTE_SUCCESS,
    payload: note,
  };
}
export function updateNoteError(error: string): IUpdateNoteErrorAction {
  return {
    type: UPDATE_NOTE_ERROR,
    payload: error,
  };
}

// REMOVE

export function removeNote(): IRemoveNoteAction {
  return {
    type: REMOVE_NOTE,
  };
}
export function removeNoteSuccess(id: string): IRemoveNoteSuccessAction {
  return {
    type: REMOVE_NOTE_SUCCESS,
    payload: id,
  };
}
export function removeNoteError(error: string): IRemoveNoteErrorAction {
  return {
    type: REMOVE_NOTE_ERROR,
    payload: error,
  };
}

// SET ACTIVE NOTE

export function setActiveNote(id: string): ISetActiveNoteAction {
  return {
    type: SET_ACTIVE_NOTE,
    payload: id,
  };
}

// SELECTED NOTES

export function addSelectedNote(id: string): IAddSelectedNoteAction {
  return {
    type: ADD_SELECTED_NOTE,
    payload: id,
  };
}
export function removeSelectedNote(id: string): IRemoveSelectedNoteAction {
  return {
    type: REMOVE_SELECTED_NOTE,
    payload: id,
  };
}
export function resetSelectedNotes(): IResetSelectedNotesAction {
  return {
    type: RESET_SELECTED_NOTES,
  };
}
