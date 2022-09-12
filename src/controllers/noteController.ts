import { Request, Response } from 'express';

import {
  Note,
  NoteCreationData,
  NoteRequestData
} from '../types/noteTypes';
import { noteService } from '../services';
import { LocalsType } from '../types/requestTypes';
import { notFoundException } from '../exceptions';

export async function createNote(
  req: Request,
  res: Response<any, LocalsType<NoteRequestData>>
): Promise<Response> {
  const note: NoteRequestData = res.locals.reqBody;
  const ownerId: number = res.locals.userId;
  const noteToCreate: NoteCreationData = { ...note, ownerId };
  const createdNote: Note = await noteService.makeNewNote(noteToCreate);
  return res.status(201).json(createdNote);
}

export async function searchUserNotes(
  req: Request,
  res: Response<any, LocalsType>
): Promise<Response> {
  const userId: number = res.locals.userId;
  const notes: Note[] = await noteService.retrieveUserNotes(userId);
  return res.status(200).json(notes);
}

export async function searchNote(
  req: Request<{ noteId: string }>,
  res: Response<any, LocalsType>
): Promise<Response> {
  const noteId: number = Number(req.params.noteId);
  if (isNaN(noteId)) {
    throw notFoundException('The note you are trying to see doesn\'t exist');
  }
  const userId: number = res.locals.userId;
  const note: Note = await noteService.retrieveNote(noteId, userId);
  return res.status(200).json(note);
}

export async function deleteNote(
  req: Request<{ noteId: string }>,
  res: Response<any, LocalsType>
): Promise<Response> {
  const noteId: number = Number(req.params.noteId);
  if (isNaN(noteId)) {
    throw notFoundException('The note you are trying to delete doesn\'t exist');
  }
  const userId: number = res.locals.userId;
  await noteService.deleteUserNote(noteId, userId);
  return res.sendStatus(204);
}
