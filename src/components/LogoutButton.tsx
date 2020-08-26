import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button, Typography, Space } from "antd";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <Button
      onClick={() => logout({ returnTo: window.location.origin })}
      danger
      ghost
    >
      <Space>
        Log out <Typography.Text keyboard>cmd/ctrl+k</Typography.Text>
      </Space>
    </Button>
  );
};

export default LogoutButton;
