1. Install dependencies via `yarn` or `npm install`
2. Run `docker-compose up -d` to start postgres
3. Migrate using the generator: `npx mikro-orm schema:create --run`
4. Run via `yarn start` or `yarn start:dev` (watch mode)
5. Example API is running on localhost:3000

Available routes:

```
GET     /author        finds all authors
GET     /author/:id    finds author by id
POST    /author        creates new author
PUT     /author/:id    updates author by id
```

```
GET     /book          finds all books
GET     /book/:id      finds book by id
POST    /book          creates new book
PUT     /book/:id      updates book by id
```
