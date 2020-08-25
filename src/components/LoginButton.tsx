import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "antd";
import { ButtonProps } from "antd/lib/button/button";

const LoginButton: React.FC<ButtonProps> = ({ children, ...rest }) => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Button
      style={{ margin: "1rem", display: "block" }}
      type="primary"
      onClick={() => loginWithRedirect()}
      size="large"
      {...rest}
    >
      {children}
    </Button>
  );
};

export default LoginButton;
