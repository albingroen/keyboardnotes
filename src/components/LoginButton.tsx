import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "antd";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Button
      style={{ margin: "1rem", display: "block" }}
      type="primary"
      onClick={() => loginWithRedirect()}
    >
      Log in to Keyboardnotes
    </Button>
  );
};

export default LoginButton;
