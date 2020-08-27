import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useRouteMatch } from "react-router-dom";
import { AppState } from "../../store";
import { patchNote } from "../../store/ducks/note/operation";
import Note from "../presentation/note";
import { setIsTyping } from "../../store/ducks/note/actions";

export default function NoteContainer() {
  const state = useSelector((state: AppState) => state);
  const { getAccessTokenSilently } = useAuth0();
  const dispatch = useDispatch();
  const match = useRouteMatch();
  const history = useHistory();

  const note = state.note.notes.find(
    ({ _id }) => _id === (match as any).params.id
  );

  const { spotlight, shortcuts } = state.interface;

  // Add keyboard listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (spotlight.isOpen || shortcuts.isOpen) return;

      switch (e.keyCode) {
        case 27: // 'esc'
          return history.push("/");
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.getSelection()?.removeAllRanges();
      dispatch(setIsTyping(false));
    };
  }, [dispatch, history, shortcuts.isOpen, spotlight.isOpen]);

  const onChange = async (values: any) => {
    const token = await getAccessTokenSilently();

    if (!note) return;

    dispatch(patchNote({ token }, note._id, values));
  };

  return (
    <Note
      onChange={(e) => onChange({ body: e.currentTarget.value })}
      setIsTyping={(value) => dispatch(setIsTyping(value))}
      onChangeTitle={(title) => onChange({ title })}
      valueTitle={note?.title}
      value={note?.body}
    />
  );
}
