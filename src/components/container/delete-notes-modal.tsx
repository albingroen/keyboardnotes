import React from "react";
import Modal from "antd/lib/modal/Modal";
import { Typography } from "antd";
import { deleteNote } from "../../http/note";
import { removeSelectedNote } from "../../store/ducks/note/actions";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "../../store";
import { useAuth0 } from "@auth0/auth0-react";

interface IDeleteNotesProps {
  visible: boolean;
}

export default function DeleteNotesModal({ visible }: IDeleteNotesProps) {
  const state = useSelector((state: AppState) => state);
  const { activeNote, selectedNotes } = state.note;
  const { getAccessTokenSilently } = useAuth0();
  const dispatch = useDispatch();

  return (
    <Modal
      visible={visible}
      title="Are you sure you want to delete this note?"
      cancelText={
        <Typography.Text>
          Cancel <Typography.Text keyboard>esc</Typography.Text>{" "}
        </Typography.Text>
      }
      okText={
        <Typography.Text style={{ color: "white" }}>
          Delete{" "}
          <Typography.Text style={{ color: "white" }} keyboard>
            enter
          </Typography.Text>{" "}
        </Typography.Text>
      }
      okButtonProps={{ danger: true }}
      onOk={async () => {
        const token = await getAccessTokenSilently();

        if (selectedNotes.length) {
          return selectedNotes.forEach((id) => {
            dispatch(deleteNote({ token }, id));
            dispatch(removeSelectedNote(id));
          });
        }

        dispatch(deleteNote({ token }, activeNote));
      }}
    >
      <Typography.Text>
        This note will be completely deleted and not recoverable.
      </Typography.Text>
    </Modal>
  );
}
