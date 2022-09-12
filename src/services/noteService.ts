import Cryptr from 'cryptr';
import dotenv from 'dotenv';

import { Note, NoteCreationData } from '../types/noteTypes';
import { noteRepository } from '../repositories';
import { conflictException, forbiddenException, notFoundException } from '../exceptions';

dotenv.config();
const secretKey: string = process.env.CRYPTR_SECRET || 'secret';
const cryptr = new Cryptr(secretKey);

export async function makeNewNote(
  note: NoteCreationData
): Promise<Note> {
  const existingNote: Note | null = await noteRepository
    .getNoteByComposition({
      title: note.title, ownerId: note.ownerId
    });
  if (existingNote) {
    throw conflictException('You already have a note with this title.');
  }

  const encryptedNote: string = cryptr.encrypt(note.body);
  const noteToSave: NoteCreationData = {
    ...note,
    body: encryptedNote,
  };
  const createdNote: Note = await noteRepository
    .createNote(noteToSave);
  return createdNote;
}

export async function retrieveUserNotes(userId: number): Promise<Note[]> {
  const notes: Note[] = await noteRepository.getUserNotes(userId);
  notes.forEach((note) => {
    const noteBody: string = note.body;
    const decryptedBody: string = cryptr.decrypt(noteBody);
    note.body = decryptedBody;
  });
  return notes;
}

export async function retrieveNote(
  noteId: number,
  requerentId: number
): Promise<Note> {
  const note: Note | null = await noteRepository.getNoteById(noteId);
  if (!note) {
    throw notFoundException('The note you are trying to see doesn\'t exist');
  }
  if (note.ownerId !== requerentId) {
    throw forbiddenException('You are not the owner of this note.');
  }
  note.body = cryptr.decrypt(note.body);
  return note;
}

export async function deleteUserNote(
  noteId: number,
  requerentId: number
): Promise<void> {
  const note: Note | null = await noteRepository.getNoteById(noteId);
  if (!note) {
    throw notFoundException('The note you are trying to delete doesn\'t exist');
  }
  if (note.ownerId !== requerentId) {
    throw forbiddenException('You are not the owner of this note.');
  }
  await noteRepository.deleteNoteById(noteId);
}
