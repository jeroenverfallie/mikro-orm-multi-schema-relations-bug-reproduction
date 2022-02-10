1. Install dependencies via `yarn` or `npm install`
2. Run `docker-compose up -d` to start postgres
3. Migrate using the generator: `npx mikro-orm schema:create --run`
4. Run via `yarn start` or `yarn start:dev` (watch mode)


Given the following setup:
```
foo.Author
foo.Publisher
bar.Book
bar.BookTag
```

Bug reproduction: Browse to `http://localhost:3000/author/2/books`

```js
// author.controller.ts
const books = await DI.bookRepository.find({ author: {id: req.params.id} });
```

Result
```
{
  "message": "select \"b0\".* from \"bar\".\"book\" as \"b0\" left join \"bar\".\"author\" as \"a1\" on \"b0\".\"author__id\" = \"a1\".\"_id\" where \"a1\".\"id\" = '2' - relation \"bar.author\" does not exist"
}
```

```bar.author" should be "foo.author"```