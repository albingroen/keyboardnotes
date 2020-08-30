import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import KeyCommandTooltip from "./presentation/key-command-tooltip";
import { Button } from "antd";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <KeyCommandTooltip title="Log out" command="cmd/ctrl+k">
      <Button
        onClick={() => logout({ returnTo: window.location.origin })}
        danger
        ghost
      >
        Log out
      </Button>
    </KeyCommandTooltip>
  );
};

export default LogoutButton;
