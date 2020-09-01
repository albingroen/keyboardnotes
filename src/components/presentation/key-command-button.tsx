import React from "react";
import { Button, Space, Typography } from "antd";

export default function KeyCommandButton(props: any) {
  return (
    <Button {...props} style={{ ...props.style, paddingRight: 0 }}>
      <Space>
        {props.children}

        <Typography.Text style={{ color: props.style.color }} keyboard>
          {props.command}
        </Typography.Text>
      </Space>
    </Button>
  );
}
