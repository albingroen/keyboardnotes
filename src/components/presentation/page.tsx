import React from "react";

interface IPageProps {
  left?: React.ReactNode;
  right?: React.ReactNode;
  children: React.ReactNode;
}

export default function Page({ left, children, right }: IPageProps) {
  return (
    <div style={{ height: "100vh", display: "flex", background: "#fafcff" }}>
      {left && <div style={{ width: "20%" }}>{left}</div>}

      <div
        style={{
          flex: 1,
          background: "white",
          boxShadow:
            "0 0 30px 0 rgba(0, 0, 0, 0.1), 0 0 0.5px 0 rgba(0, 0, 0, 0.05)",
        }}
      >
        {children}
      </div>

      {right && <div style={{ width: "25%" }}>{right}</div>}
    </div>
  );
}
