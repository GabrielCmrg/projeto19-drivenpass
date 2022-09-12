import { Note } from '@prisma/client';

export { Note };
export type NoteCreationData = Omit<Note, 'id'>;
export type NoteComposition = Pick<Note, 'title' | 'ownerId'>;
export type NoteRequestData = Omit<NoteCreationData, 'ownerId'>;
