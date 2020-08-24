import Axios from "axios";

export const request = (requestContext: { token: string }) =>
  Axios.create({
    baseURL: "http://localhost:5000",
    headers: {
      Authorization: `bearer ${requestContext.token}`,
    },
  });
