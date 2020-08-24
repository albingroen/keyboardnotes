import React from "react";
import { IUser } from "../../types";

interface IProfileProps {
  user: IUser;
}

export default function Profile({ user }: IProfileProps) {
  return (
    <div>
      <img src={user.picture} alt={user.name} />
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
}
