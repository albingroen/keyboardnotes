import React from "react";
import { Space, Typography, Button } from "antd";
import LogoutButton from "../LogoutButton";
import ShortcutsButton from "../ShortcutsButton";
import { IUser } from "../../types";
import KeyCommandTooltip from "./key-command-tooltip";

interface IContextFooterProps {
  user: IUser;
  login: () => void;
}

export default function ContextFooter({ user, login }: IContextFooterProps) {
  return (
    <Space direction="vertical" size="middle">
      <Typography.Text type="secondary">{user?.email}</Typography.Text>
      <Space size="small" align="center">
        <ShortcutsButton />
        {user ? (
          <LogoutButton />
        ) : (
          <KeyCommandTooltip command="cmd/ctrl + k">
            <Button
              onClick={() => login()}
              type="primary"
            >
              Log in / Sign up
            </Button>
          </KeyCommandTooltip>
        )}
      </Space>
    </Space>
  );
}
