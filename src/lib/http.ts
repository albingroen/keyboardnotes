import Axios from "axios";
import { IRequestContext } from "../types";

export const request = (requestContext: IRequestContext) =>
  Axios.create({
    baseURL: "https://backend-keyboardnotes.herokuapp.com",
    headers: {
      Authorization: `bearer ${requestContext.token}`,
    },
  });
