import { useAuth0 } from "@auth0/auth0-react";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createNote } from "../store/ducks/note/operation";

export default function NewNoteView() {
  const { getAccessTokenSilently } = useAuth0();
  const dispatch = useDispatch();
  const history = useHistory();

  const [isCreated, setIsCreated] = useState<boolean>(false);

  useEffect(() => {
    const createNewNote = async () => {
      const token = await getAccessTokenSilently();
      dispatch(createNote({ token, history }));
    };

    if (!isCreated) {
      createNewNote();
      setIsCreated(true);
    }
  }, [dispatch, getAccessTokenSilently, history, isCreated]);

  return <div />;
}
