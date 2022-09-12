import { Router } from 'express';

import { noteController } from '../controllers';
import { validationMiddlewares } from '../middlewares';
import { noteSchemas } from '../schemas';

const noteRouter: Router = Router();

noteRouter.post(
  '/notes',
  validationMiddlewares.validateBody(noteSchemas.noteRequestSchema),
  validationMiddlewares.validateHeader,
  noteController.createNote
);
noteRouter.get(
  '/notes',
  validationMiddlewares.validateHeader,
  noteController.searchUserNotes
);
noteRouter.get(
  '/notes/:noteId',
  validationMiddlewares.validateHeader,
  noteController.searchNote
);
noteRouter.delete(
  '/notes/:noteId',
  validationMiddlewares.validateHeader,
  noteController.deleteNote
);

export default noteRouter;
