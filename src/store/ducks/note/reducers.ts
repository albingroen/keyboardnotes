import {
  FETCH_NOTES,
  NoteActions,
  FETCH_NOTES_SUCCESS,
  FETCH_NOTES_ERROR,
  ADD_NOTE,
  ADD_NOTE_SUCCESS,
  ADD_NOTE_ERROR,
  UPDATE_NOTE,
  UPDATE_NOTE_SUCCESS,
  UPDATE_NOTE_ERROR,
  REMOVE_NOTE,
  REMOVE_NOTE_SUCCESS,
  REMOVE_NOTE_ERROR,
  SET_ACTIVE_NOTE,
  ADD_SELECTED_NOTE,
  REMOVE_SELECTED_NOTE,
  RESET_SELECTED_NOTES,
} from "./types";
import { INote, ActionStatus } from "../../../types";

export interface INoteState {
  notes: INote[];
  activeNote: string;
  selectedNotes: string[];

  fetchNotesStatus: ActionStatus;
  fetchNotesError: string;

  addNoteStatus: ActionStatus;
  addNoteError: string;

  updateNoteStatus: ActionStatus;
  updateNoteError: string;

  deleteNoteStatus: ActionStatus;
  deleteNoteError: string;
}

const initialState: INoteState = {
  notes: [],
  activeNote: "",
  selectedNotes: [],

  fetchNotesStatus: "idle",
  fetchNotesError: "",

  addNoteStatus: "idle",
  addNoteError: "",

  updateNoteStatus: "idle",
  updateNoteError: "",

  deleteNoteStatus: "idle",
  deleteNoteError: "",
};

export default function reducer(
  state = initialState,
  action: NoteActions
): INoteState {
  switch (action.type) {
    // FETCH

    case FETCH_NOTES:
      return {
        ...state,
        fetchNotesStatus: "loading",
      };
    case FETCH_NOTES_SUCCESS:
      return {
        ...state,
        activeNote: action.payload[0]._id,
        fetchNotesStatus: "success",
        notes: action.payload,
        fetchNotesError: "",
      };
    case FETCH_NOTES_ERROR:
      return {
        ...state,
        fetchNotesStatus: "error",
        fetchNotesError: action.payload,
      };

    // ADD

    case ADD_NOTE:
      return {
        ...state,
        addNoteStatus: "loading",
      };
    case ADD_NOTE_SUCCESS:
      return {
        ...state,
        notes: [action.payload, ...state.notes],
        activeNote: action.payload._id,
        addNoteStatus: "success",
        addNoteError: "",
      };
    case ADD_NOTE_ERROR:
      return {
        ...state,
        addNoteStatus: "error",
        addNoteError: action.payload,
      };

    // UPDATE

    case UPDATE_NOTE:
      return {
        ...state,
        updateNoteStatus: "loading",
      };
    case UPDATE_NOTE_SUCCESS:
      return {
        ...state,
        updateNoteStatus: "success",
        notes: state.notes.map((note) =>
          note._id === action.payload._id ? action.payload : note
        ),
        updateNoteError: "",
      };
    case UPDATE_NOTE_ERROR:
      return {
        ...state,
        updateNoteStatus: "error",
        updateNoteError: action.payload,
      };

    // DELETE

    case REMOVE_NOTE:
      return {
        ...state,
        deleteNoteStatus: "loading",
      };
    case REMOVE_NOTE_SUCCESS:
      const noteIndex = state.notes.findIndex(
        (node) => node._id === action.payload
      );
      const newActiveNoteIndex =
        noteIndex + (noteIndex === state.notes.length - 1 ? -1 : 1);

      return {
        ...state,
        notes: state.notes.filter((note) => note._id !== action.payload),
        activeNote: state.notes[newActiveNoteIndex]?._id || "",
        deleteNoteStatus: "success",
        deleteNoteError: "",
      };
    case REMOVE_NOTE_ERROR:
      return {
        ...state,
        deleteNoteStatus: "error",
        deleteNoteError: action.payload,
      };

    // SET ACTIVE NOTE

    case SET_ACTIVE_NOTE:
      return {
        ...state,
        activeNote: action.payload,
      };

    // SELECTED NOTES

    case ADD_SELECTED_NOTE:
      return {
        ...state,
        selectedNotes: [...state.selectedNotes, action.payload],
      };
    case REMOVE_SELECTED_NOTE:
      return {
        ...state,
        selectedNotes: state.selectedNotes.filter(
          (id) => id !== action.payload
        ),
      };
    case RESET_SELECTED_NOTES:
      return {
        ...state,
        selectedNotes: [],
      };

    default:
      return state;
  }
}
