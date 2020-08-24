import { request } from "../lib/http";
import { IRequestContext } from "../types";

export const getNotes = async (requestContext: IRequestContext) => {
  const response = await request(requestContext).get(`/notes`);

  return response.data.notes;
};

export const createNote = async (requestContext: IRequestContext) => {
  const response = await request(requestContext).post(`/notes`);

  return response.data.note;
};

export const updateNote = async (
  requestContext: IRequestContext,
  id: string,
  values: any
) => {
  const response = await request(requestContext).patch(`/notes/${id}`, values);

  return response.data.note;
};

export const deleteNote = async (
  requestContext: IRequestContext,
  id: string
) => {
  const response = await request(requestContext).delete(`/notes/${id}`);

  return response.status === 200;
};
