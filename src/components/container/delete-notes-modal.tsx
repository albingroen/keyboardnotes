import React from "react";
import Modal from "antd/lib/modal/Modal";
import { Typography } from "antd";
import { removeSelectedNote } from "../../store/ducks/note/actions";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "../../store";
import { useAuth0 } from "@auth0/auth0-react";
import { deleteNote } from "../../store/ducks/note/operation";

interface IDeleteNotesProps {
  setDeleteNotesIsOpen: (value: boolean) => void;
  visible: boolean;
}

export default function DeleteNotesModal({
  setDeleteNotesIsOpen,
  visible,
}: IDeleteNotesProps) {
  const state = useSelector((state: AppState) => state);
  const { activeNote, selectedNotes } = state.note;
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const dispatch = useDispatch();

  return (
    <Modal
      visible={visible}
      title="Are you sure you want to delete this note?"
      cancelText="Cancel"
      okText="Yes, delete"
      okButtonProps={{ danger: true }}
      onCancel={() => setDeleteNotesIsOpen(false)}
      onOk={async () => {
        const token = isAuthenticated
          ? await getAccessTokenSilently()
          : undefined;

        setDeleteNotesIsOpen(false);

        if (selectedNotes.length) {
          return selectedNotes.forEach((id) => {
            dispatch(deleteNote({ token }, id));
            dispatch(removeSelectedNote(id));
          });
        }

        dispatch(deleteNote({ token }, activeNote));
      }}
    >
      <Typography.Text type="secondary">
        This note will be completely deleted and not recoverable.
      </Typography.Text>
    </Modal>
  );
}
