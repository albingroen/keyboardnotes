import React from "react";
import { List, Typography, Spin, Button, Space } from "antd";
import moment from "moment";
import { INote, IUser } from "../../types";
import Editor from "rich-markdown-editor";
import ContextFooter from "../container/context-footer";
import { motion, AnimatePresence } from "framer-motion";
import Page from "./page";
import KeyCommandTooltip from "./key-command-tooltip";

interface INotesProps {
  user: IUser;
  notes: INote[];
  isLoading: boolean;
  activeNote?: string;
  selectedNotes: string[];
  createNote: () => void;
  onNoteClick: (id: string) => void;
  onMouseEnter: (id: string) => void;
}

export default function Notes({
  user,
  notes,
  activeNote,
  isLoading,
  createNote,
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
            overflowY: "auto",
            height: "100%",
          }}
        >
          <div style={{ flex: 1, marginBottom: "3rem" }}>
            <Editor
              defaultValue={currentNoteValue || " "}
              value={currentNoteValue || " "}
              className="markdown"
              onChange={() => {}}
              readOnly
            />
          </div>

          <ContextFooter />
        </div>
      }
    >
      <div style={{ height: "100%", overflowY: "auto" }}>
        <Space
          align="center"
          style={{
            justifyContent: "space-between",
            padding: "1rem 2rem",
            width: "100%",
          }}
        >
          <Typography.Title
            style={{ margin: 0, padding: 0, lineHeight: 1 }}
            level={5}
          >
            All notes
          </Typography.Title>
          <KeyCommandTooltip title="Create a new note" command="c">
            <Button onClick={createNote}>New note</Button>
          </KeyCommandTooltip>
        </Space>
        <AnimatePresence>
          {isLoading || !notes.length ? (
            <motion.div
              style={{
                display: "flex",
                padding: "1rem",
                justifyContent: "center",
                alignItems: "center",
              }}
              layout
            >
              {isLoading ? (
                <Spin />
              ) : (
                <Typography.Text style={{ textAlign: "center" }}>
                  Hit <Typography.Text keyboard>c</Typography.Text> to create a
                  new note
                </Typography.Text>
              )}
            </motion.div>
          ) : (
            notes.map((note) => {
              const isSelected = selectedNotes.includes(note._id);
              const isActive = note._id === activeNote;

              return (
                <motion.div exit={{ x: 300, opacity: 0 }} key={note._id} layout>
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
                      padding: "0.5rem 2rem",
                      paddingLeft: "calc(2rem - 4px)",
                      // paddingRight: "2rem",
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
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>
    </Page>
  );
}
