import { NoteActions } from "./note/types";
import { InterfaceActions } from "./interface/types";

export type AppActions = NoteActions | InterfaceActions;
