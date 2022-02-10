import { Options } from '@mikro-orm/core';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';

import { Author, Book, BookTag, Publisher, BaseEntity } from './entities';

const options: Options = {
  type: 'postgresql',
  entities: [Author, Book, BookTag, Publisher, BaseEntity],
  dbName: 'postgres',
  highlighter: new SqlHighlighter(),
  debug: true,
  host: '127.0.0.1',
  port: 5432,
  user: 'postgres',
  password: 'postgres'
};

export default options;
