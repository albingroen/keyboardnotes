import React from "react";
import { INote } from "../../types";
import { List, Typography } from "antd";
import moment from "moment";

interface INotesProps {
  notes: INote[];
  isLoading: boolean;
  activeNote?: string;
  onNoteClick: (id: string) => void;
  onMouseEnter: (id: string) => void;
}

export default function Notes({
  notes,
  activeNote,
  isLoading,
  onNoteClick,
  onMouseEnter,
}: INotesProps) {
  return (
    <List
      size="small"
      bordered={false}
      dataSource={notes}
      loading={isLoading}
      renderItem={(note) => (
        <List.Item
          onClick={() => onNoteClick(note._id)}
          onMouseEnter={() => onMouseEnter(note._id)}
          style={{
            background: note._id === activeNote ? "#f4f6fb" : "white",
            cursor: "pointer",
          }}
        >
          <List.Item.Meta title={note.title} />
          <Typography.Text type="secondary">
            {moment(note.createdAt).format("DD MMM HH:mm")}
          </Typography.Text>
        </List.Item>
      )}
    />
  );
}
