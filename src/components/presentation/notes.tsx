import React from "react";
import { List, Typography } from "antd";
import moment from "moment";
import { INote } from "../../types";
import Editor from "rich-markdown-editor";
import ContextFooter from "../container/context-footer";
import Page from "./page";

interface INotesProps {
  notes: INote[];
  isLoading: boolean;
  activeNote?: string;
  selectedNotes: string[];
  onNoteClick: (id: string) => void;
  onMouseEnter: (id: string) => void;
}

export default function Notes({
  notes,
  activeNote,
  isLoading,
  onNoteClick,
  onMouseEnter,
  selectedNotes,
}: INotesProps) {
  const currentNoteValue = notes.find((note) => note._id === activeNote)?.body;

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
            <Editor
              defaultValue={currentNoteValue}
              value={currentNoteValue}
              className="markdown"
              onChange={() => {}}
              readOnly
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
          emptyText: (
            <Typography.Text type="secondary">
              Hit <Typography.Text keyboard>c</Typography.Text> to create a note
            </Typography.Text>
          ),
        }}
        renderItem={(note) => {
          const isSelected = selectedNotes.includes(note._id);
          const isActive = note._id === activeNote;

          return (
            <List.Item
              onClick={() => onNoteClick(note._id)}
              onMouseEnter={() => onMouseEnter(note._id)}
              style={{
                border: "none",
                borderLeft: "4px solid white",
                background: isSelected
                  ? "#54acdc"
                  : isActive
                  ? "#f4f6fb"
                  : "white",
                borderLeftColor: isSelected
                  ? isActive
                    ? "white"
                    : "#54acdc"
                  : isActive
                  ? "#aeb1dd"
                  : "white",
                cursor: "pointer",
                padding: "0.5rem 3rem",
                paddingRight: "2rem",
              }}
            >
              <Typography.Text
                style={{
                  color: isSelected ? "white" : "inherit",
                  fontWeight: 500,
                }}
              >
                {note.title}
              </Typography.Text>
              <Typography.Text
                style={{ color: isSelected ? "white" : "#888" }}
                type="secondary"
              >
                {moment(note.createdAt).format("DD MMM HH:mm")}
              </Typography.Text>
            </List.Item>
          );
        }}
      />
    </Page>
  );
}
