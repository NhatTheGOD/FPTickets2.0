import { create, router as _router, defaults } from 'json-server';
import auth from 'json-server-auth';

const server = create();
const router = _router('db.json');
const middlewares = defaults();

// Bind the router db to the app
server.db = router.db;

// Apply the auth middleware before the router
server.use(middlewares);
server.use(auth);
server.use(router);

server.listen(3001, () => {
  console.log('JSON Server is running');
});
