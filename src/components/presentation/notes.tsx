import React from "react";
import ReactMarkdown from "react-markdown";
import { INote } from "../../types";
import { List, Typography } from "antd";
import moment from "moment";
import Page from "./page";
import LogoutButton from "../LogoutButton";

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
    <Page
      right={
        <div
          style={{
            padding: "1.5rem 2rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            height: "100%",
          }}
        >
          <div style={{ flex: 1 }}>
            <ReactMarkdown
              source={notes.find((note) => note._id === activeNote)?.body}
            />
          </div>
          <LogoutButton />
        </div>
      }
    >
      <List
        size="small"
        bordered={false}
        dataSource={notes}
        loading={isLoading}
        locale={{
          emptyText: `Hit "c" to create a new note`,
        }}
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

      {notes.length ? (
        <Typography.Text
          type="secondary"
          style={{
            padding: "1rem",
            textAlign: "center",
            margin: "0 auto",
            display: "block",
          }}
        >
          {`Hit "c" to create, and "e" to delete a note. Browse using "j" and "k".`}
        </Typography.Text>
      ) : null}
    </Page>
  );
}
