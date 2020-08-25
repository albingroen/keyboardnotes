import React, { useEffect } from "react";
import { Drawer } from "antd";
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
  const { shortcuts, spotlight } = useSelector(
    (state: AppState) => state.interface
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.keyCode) {
        case 191:
          return dispatch(toggleInterfaceItem("shortcuts"));
        case 75:
          return e.metaKey && dispatch(toggleInterfaceItem("spotlight"));
        case 27:
          return dispatch(toggleInterfaceItem("spotlight", false));
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [dispatch]);

  return (
    <div style={{ height: "100vh", display: "flex", background: "#fafcff" }}>
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
  );
}
