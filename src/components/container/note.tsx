import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useRouteMatch } from "react-router-dom";
import { AppState } from "../../store";
import { patchNote } from "../../store/ducks/note/operation";
import Note from "../presentation/note";

export default function NoteContainer() {
  const { getAccessTokenSilently } = useAuth0();
  const dispatch = useDispatch();
  const match = useRouteMatch();
  const history = useHistory();

  const note = useSelector((state: AppState) => state.note.notes).find(
    ({ _id }) => _id === (match as any).params.id
  );

  // Add keyboard listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.keyCode) {
        case 27: // 'esc'
          return history.push("/");
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [history]);

  const onChange = async (values: any) => {
    const token = await getAccessTokenSilently();

    if (!note) return;

    dispatch(patchNote({ token }, note._id, values));
  };

  return (
    <Note
      onChange={(e) => onChange({ body: e.currentTarget.value })}
      onChangeTitle={(title) => onChange({ title })}
      valueTitle={note?.title}
      value={note?.body}
    />
  );
}
