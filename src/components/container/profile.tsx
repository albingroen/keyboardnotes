import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Profile from "../presentation/profile";

export default function ProfileContainert() {
  const { user } = useAuth0();

  return <Profile user={user} />;
}
