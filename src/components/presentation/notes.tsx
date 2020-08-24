import React, { CSSProperties } from "react";
import { List, Typography } from "antd";
import moment from "moment";
import ReactMarkdown from "react-markdown";
import { INote } from "../../types";
import ContextFooter from "../container/context-footer";
import Page from "./page";

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

          <ContextFooter />
        </div>
      }
    >
      <List
        size="small"
        bordered={false}
        dataSource={notes}
        loading={isLoading}
        locale={{
          emptyText: <KeyboardGuide />,
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
        <KeyboardGuide
          style={{
            padding: "1rem",
            textAlign: "center",
            margin: "0 auto",
            display: "block",
          }}
        />
      ) : null}
    </Page>
  );
}

const KeyboardGuide: React.FC<{ style?: CSSProperties }> = ({ style }) => (
  <Typography.Text type="secondary" style={style}>
    Hit <Typography.Text keyboard>c</Typography.Text> to create, and{" "}
    <Typography.Text keyboard>e</Typography.Text> to delete a note. Browse using{" "}
    <Typography.Text keyboard>j</Typography.Text> and{" "}
    <Typography.Text keyboard>k</Typography.Text>.<br />
    Hit <Typography.Text keyboard>enter</Typography.Text> to edit and{" "}
    <Typography.Text keyboard>esc</Typography.Text> to come back when editing.
  </Typography.Text>
);
