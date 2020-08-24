import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import ContextFooter from "../presentation/context-footer";

export default function ContextFooterContainer() {
  const { user } = useAuth0();

  return <ContextFooter user={user} />;
}
