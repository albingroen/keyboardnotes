import React from "react";
import Modal from "antd/lib/modal/Modal";
import { Typography, Space } from "antd";
import { removeSelectedNote } from "../../store/ducks/note/actions";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "../../store";
import { useAuth0 } from "@auth0/auth0-react";
import { deleteNote } from "../../store/ducks/note/operation";

interface IDeleteNotesProps {
  visible: boolean;
}

export default function DeleteNotesModal({ visible }: IDeleteNotesProps) {
  const state = useSelector((state: AppState) => state);
  const { activeNote, selectedNotes } = state.note;
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const dispatch = useDispatch();

  return (
    <Modal
      visible={visible}
      title="Are you sure you want to delete this note?"
      cancelText={
        <Typography.Text>
          <Space>
            Cancel
            <Typography.Text keyboard>esc</Typography.Text>
          </Space>
        </Typography.Text>
      }
      okText={
        <Typography.Text style={{ color: "white" }}>
          <Space>
            Delete
            <Typography.Text style={{ color: "white" }} keyboard>
              enter
            </Typography.Text>
          </Space>
        </Typography.Text>
      }
      cancelButtonProps={{ style: { paddingRight: 0 } }}
      okButtonProps={{ danger: true, style: { paddingRight: 0 } }}
      onOk={async () => {
        const token = isAuthenticated
          ? await getAccessTokenSilently()
          : undefined;

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
