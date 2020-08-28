import React, { ChangeEvent, useRef } from "react";
import { Divider, Space } from "antd";
import ContentEditable from "react-contenteditable";
import { Link } from "react-router-dom";
import Editor from "rich-markdown-editor";
import ContextFooter from "../container/context-footer";
import KeyCommandButton from "./key-command-button";
import Page from "./page";

interface INoteProps {
  value?: string;
  valueTitle?: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onChangeTitle: (value: string) => void;
  setIsTyping: (value: boolean) => void;
}

export default function Note({
  value,
  valueTitle,
  onChange,
  onChangeTitle,
  setIsTyping,
}: INoteProps) {
  const text = useRef<any>(valueTitle);

  if (text.current === undefined) {
    text.current = valueTitle;
  }

  return (
    <Page
      left={
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
            <Space>
              <Link to="/">
                <KeyCommandButton command="esc">Back</KeyCommandButton>
              </Link>
            </Space>
          </div>
        </div>
      }
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
              className="markdown"
              defaultValue={value || " "}
              value={value || " "}
              onChange={() => {}}
              readOnly
            />
          </div>

          <ContextFooter />
        </div>
      }
    >
      <div
        style={{
          display: "flex",
          height: "100%",
          flexDirection: "column",
          padding: "2rem",
        }}
      >
        <ContentEditable
          tagName="h1"
          className="note-heading"
          onFocus={(e) => document.execCommand("selectAll", false)}
          html={text.current}
          onChange={(e) => {
            onChangeTitle(e.target.value);
            text.current = e.target.value;
          }}
        />

        <Divider />

        <textarea
          style={{ flex: 1, width: "100%", border: "none", fontSize: "1.1em" }}
          placeholder="Start jotting down your thoughts (markdown is supported)"
          onBlur={() => setIsTyping(false)}
          onFocus={() => setIsTyping(true)}
          onChange={onChange}
          defaultValue={value}
          autoFocus
        />
      </div>
    </Page>
  );
}
