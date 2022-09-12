import { client } from '../config/database';
import {
  Note,
  NoteComposition,
  NoteCreationData
} from '../types/noteTypes';

export async function createNote(
  note: NoteCreationData
): Promise<Note> {
  const createdNote: Note = await client.note.create({ data: note });
  return createdNote;
}

export async function getNoteByComposition(
  composition: NoteComposition
): Promise<Note | null> {
  const note: Note | null = await client.note.findUnique({
    where: { title_ownerId: composition }
  });
  return note;
}

export async function getUserNotes(ownerId: number): Promise<Note[]> {
  const notes: Note[] = await client.note.findMany({
    where: { ownerId }
  });
  return notes;
}

export async function getNoteById(noteId: number): Promise<Note | null> {
  const note: Note | null = await client.note.findUnique({
    where: { id: noteId }
  });
  return note;
}

export async function deleteNoteById(noteId: number): Promise<void> {
  await client.note.delete({ where: { id: noteId } });
}
