import React, { useEffect } from "react";
import LoginButton from "../components/LoginButton";
import { Typography, Space } from "antd";
import { useAuth0 } from "@auth0/auth0-react";

export default function LoginView() {
  const { loginWithRedirect } = useAuth0();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.keyCode) {
        case 13:
          return loginWithRedirect();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.addEventListener("keydown", handleKeyDown);
  }, [loginWithRedirect]);

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: `url(https://res.cloudinary.com/albin-groen/image/upload/f_auto,w_3000/v1598357351/fabrizio-conti-ds_W6kF3IoU-unsplash_bogv6a.jpg)`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <Space
        direction="vertical"
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Space direction="vertical" align="center">
          <Typography.Title
            level={2}
            style={{
              fontWeight: 300,
              color: "white",
              margin: 0,
              padding: 0,
              lineHeight: 1,
            }}
          >
            Welcome to Keyboardnotes
          </Typography.Title>

          <Typography.Text style={{ color: "white" }}>
            Hit{" "}
            <Typography.Text keyboard style={{ color: "white" }}>
              enter
            </Typography.Text>{" "}
            to login to Keyboardnotes
          </Typography.Text>
        </Space>

        <LoginButton>Get started now</LoginButton>
      </Space>
    </div>
  );
}
