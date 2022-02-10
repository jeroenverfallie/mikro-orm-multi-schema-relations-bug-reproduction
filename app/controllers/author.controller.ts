import { Request, Response } from 'express';
import Router from 'express-promise-router';
import { QueryOrder, wrap } from '@mikro-orm/core';

import { DI } from '../server';
import { Author } from '../entities';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  const authors = await DI.authorRepository.findAll({populate: ['books'], orderBy: {name: QueryOrder.DESC}, limit: 20});
  res.json(authors);
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const author = await DI.authorRepository.findOne({ id: req.params.id }, {populate: ['books']});

    if (!author) {
      return res.status(404).json({ message: 'Author not found' });
    }

    res.json(author);
  } catch (e) {
    return res.status(400).json({ message: (e as Error).message });
  }
});

router.get('/:id/books', async (req: Request, res: Response) => {
  try {
    const books = await DI.bookRepository.find({ author: {id: req.params.id} });

    if (!books) {
      return res.status(404).json({ message: 'Books not found' });
    }

    res.json(books);
  } catch (e) {
    return res.status(400).json({ message: (e as Error).message });
  }
});

router.post('/', async (req: Request, res: Response) => {
  if (!req.body.name || !req.body.email) {
    res.status(400);
    return res.json({ message: 'One of `name, email` is missing' });
  }

  try {
    const author = new Author(req.body.name, req.body.email);
    wrap(author).assign(req.body);
    await DI.authorRepository.persist(author).flush();

    res.json(author);
  } catch (e) {
    return res.status(400).json({ message: (e as Error).message });
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  try {
    const author = await DI.authorRepository.findOne(req.params.id);

    if (!author) {
      return res.status(404).json({ message: 'Author not found' });
    }

    wrap(author).assign(req.body);
    await DI.authorRepository.flush();

    res.json(author);
  } catch (e) {
    return res.status(400).json({ message: (e as Error).message });
  }
});

export const AuthorController = router;
