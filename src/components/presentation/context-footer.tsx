import React from "react";
import { Space, Typography } from "antd";
import LogoutButton from "../LogoutButton";
import ShortcutsButton from "../ShortcutsButton";
import { IUser } from "../../types";
import KeyCommandButton from "./key-command-button";

interface IContextFooterProps {
  user: IUser;
  login: () => void;
}

export default function ContextFooter({ user, login }: IContextFooterProps) {
  return (
    <Space direction="vertical" size="middle">
      <Typography.Text type="secondary">{user.email}</Typography.Text>
      <Space size="small" align="center">
        <ShortcutsButton />
        {user ? (
          <LogoutButton />
        ) : (
          <KeyCommandButton
            onClick={() => login()}
            command="cmd/ctrl + k"
            type="primary"
            style={{ color: "white" }}
          >
            Log in
          </KeyCommandButton>
        )}
      </Space>
    </Space>
  );
}
