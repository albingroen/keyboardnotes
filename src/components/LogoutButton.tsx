import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import KeyCommandButton from "./presentation/key-command-button";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <KeyCommandButton
      command="cmd/ctrl+k"
      onClick={() => logout({ returnTo: window.location.origin })}
      style={{ background: 'none' }}
      danger
      ghost
    >
      Log out
    </KeyCommandButton>
  );
};

export default LogoutButton;
