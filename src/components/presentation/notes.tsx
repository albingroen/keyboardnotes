import React from "react";
import { List, Typography } from "antd";
import moment from "moment";
import ReactMarkdown from "react-markdown";
import { INote } from "../../types";
import ContextFooter from "../container/context-footer";
import KeyboardGuide from "./keyboard-guide";
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
        renderItem={(note) => {
          const isSelected = selectedNotes.includes(note._id);

          return (
            <List.Item
              onClick={() => onNoteClick(note._id)}
              onMouseEnter={() => onMouseEnter(note._id)}
              style={{
                background: isSelected
                  ? "#54acdc"
                  : note._id === activeNote
                  ? "#f4f6fb"
                  : "white",
                cursor: "pointer",
                border: "none",
                padding: '0.5rem 4rem',
                paddingRight: '2rem',
              }}
            >
              <Typography.Text
                strong
                style={{ color: isSelected ? "white" : "inherit" }}
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
