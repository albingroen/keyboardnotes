import Axios from "axios";

export const request = (requestContext: { token: string }) =>
  Axios.create({
    baseURL: "https://backend-keyboardnotes.herokuapp.com",
    headers: {
      Authorization: `bearer ${requestContext.token}`,
    },
  });
