import React from "react";
import { Space, Typography } from "antd";
import LogoutButton from "../LogoutButton";
import { IUser } from "../../types";

interface IContextFooterProps {
  user: IUser;
}

export default function ContextFooter({ user }: IContextFooterProps) {
  return (
    <Space size="middle">
      <LogoutButton />
      <Typography.Text type="secondary">{user.email}</Typography.Text>
    </Space>
  );
}
