import React, { useEffect } from "react";
import { Drawer, Alert } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../store";
import { toggleInterfaceItem } from "../../store/ducks/interface/operation";
import KeyboardGuide from "./keyboard-guide";
import Spotlight from "../container/spotlight";

interface IPageProps {
  left?: React.ReactNode;
  right?: React.ReactNode;
  children: React.ReactNode;
}

export default function Page({ left, children, right }: IPageProps) {
  const state = useSelector((state: AppState) => state);
  const { shortcuts, spotlight } = state.interface;
  const { isTyping } = state.note;
  const dispatch = useDispatch();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.keyCode) {
        case 191: // '?'
          if (isTyping) return;

          return dispatch(toggleInterfaceItem("shortcuts"));
        case 75: // 'cmd+k'
          return e.metaKey && dispatch(toggleInterfaceItem("spotlight"));
        case 27: // 'esc'
          return dispatch(toggleInterfaceItem("spotlight", false));
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [dispatch, isTyping]);

  return (
    <div>
      <Alert
        message="On Aug 26 a database upgrade will be performed due to the large scale of signups on Keyboardnotes. This means there might be some potential downtime."
        type="warning"
      />
      <div
        style={{
          height: "calc(100vh - 40px)",
          display: "flex",
          background: "#fafcff",
        }}
      >
        {left && <div style={{ width: "20%" }}>{left}</div>}

        {spotlight.isOpen && <Spotlight />}

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

        <Drawer
          title="Keyboard shortcuts"
          visible={shortcuts.isOpen}
          onClose={() => dispatch(toggleInterfaceItem("shortcuts"))}
          width={300}
        >
          <KeyboardGuide />
        </Drawer>
      </div>
    </div>
  );
}
