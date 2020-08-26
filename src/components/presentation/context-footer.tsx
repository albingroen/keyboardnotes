import React from "react";
import { Space, Typography } from "antd";
import LogoutButton from "../LogoutButton";
import ShortcutsButton from "../ShortcutsButton";
import { IUser } from "../../types";

interface IContextFooterProps {
  user: IUser;
}

export default function ContextFooter({ user }: IContextFooterProps) {
  return (
    <Space direction="vertical" size="middle">
      <Typography.Text type="secondary">{user.email}</Typography.Text>
      <Space size="small" align="center">
        <ShortcutsButton />
        <LogoutButton />
      </Space>
    </Space>
  );
}
