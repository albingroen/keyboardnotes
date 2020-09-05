import React, { useEffect } from "react";
import { Drawer, Alert } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../store";
import { toggleInterfaceItem } from "../../store/ducks/interface/operation";
import KeyboardGuide from "./keyboard-guide";
import Spotlight from "../container/spotlight";
import { useAuth0 } from "@auth0/auth0-react";
import { setInterfaceWidth } from "../../store/ducks/interface/actions";

interface IPageProps {
  left?: React.ReactNode;
  right?: React.ReactNode;
  children: React.ReactNode;
}

export default function Page({ left, children, right }: IPageProps) {
  const state = useSelector((state: AppState) => state);
  const { shortcuts, spotlight, rightSplit } = state.interface;
  const { isAuthenticated } = useAuth0();
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
        case 72: // 'h'
          if (!e.shiftKey) return;
          e.preventDefault();
          e.stopPropagation();
          return dispatch(
            setInterfaceWidth("rightSplit", (rightSplit.width || 25) + 10)
          );
        case 76: // 'l'
          if (!e.shiftKey) return;
          e.preventDefault();
          e.stopPropagation();
          return dispatch(
            setInterfaceWidth("rightSplit", (rightSplit.width || 25) - 10)
          );
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [dispatch, isTyping, rightSplit.width]);

  return (
    <div>
      {/* <Alert
        message="On Aug 28 - Aug 29, due to the launch of the Keyboardnotes landing page, there may be downtime."
        type="warning"
      /> */}

      {!isAuthenticated && (
        <Alert
          message="You are currently not signed in to Keyboardnotes. Nothing you do here will be saved. This is just for trying out the app."
          type="warning"
          showIcon
        />
      )}

      <div
        style={{
          height: isAuthenticated ? "100vh" : "calc(100vh - 40px)",
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

        {right && <div style={{ width: `${rightSplit.width}%` }}>{right}</div>}

        <Drawer
          title="Keyboard shortcuts"
          visible={shortcuts.isOpen}
          onClose={() => dispatch(toggleInterfaceItem("shortcuts"))}
          width={400}
        >
          <KeyboardGuide />
        </Drawer>
      </div>
    </div>
  );
}
