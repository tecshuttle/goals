import { Application, Router } from 'https://deno.land/x/oak/mod.ts';
import { Client } from 'https://deno.land/x/mysql/mod.ts';
const client = new Client();
client.connect({
  hostname: 'www.tomtalk.net',
  username: 'root',
  password: 'tec007DB',
  db: 'tomtalk',
});

const app = new Application();
const router = new Router();

router.get('/', (ctx) => {
  ctx.response.body = 'Hello World Welcome......';
});

router.get('/api', (ctx) => {
  ctx.response.body = 'api';
});

router.get('/mysql', async (ctx) => {
  const data = await client.query(`SELECT * FROM todo_projects`);

  ctx.response.body = {
    success: true,
    data,
  };
});

app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 4000 });
