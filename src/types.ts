export interface IUser {
  sub: string;
  name: string;
  picture: string;
  email: string;
}

export interface INote {
  _id: string;
  title: string;
  body: string;
  createdAt: string;
}

interface IHistory {
  push: (path: string) => void;
}

export interface IRequestContext {
  token: string;
  history?: IHistory;
}

export type ActionStatus = "error" | "success" | "idle" | "loading";
