// eslint-disable-next-line no-unused-vars
import { Request, Response, Router } from 'express';
import Book from '../../models/book';
import logger from '../../utils/logger';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  logger.debug('Listing');
  try {
    const books = await Book.find();
    res.status(200)
      .json(books);
  } catch (error) {
    logger.error('An error ocurred:', error);
    res.status(500)
      .json(error);
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  logger.debug(`Listing the id [${req.params.id}]`);
  try {
    const book = await Book.findById(req.params.id);
    res.status(200)
      .json(book);
  } catch (error) {
    logger.error('An error ocurred:', error);
    res.status(500)
      .json(error);
  }
});

export default router;
