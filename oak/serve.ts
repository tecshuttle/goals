import {
  Application,
  Router,
  Context,
  RouterContext,
} from "https://deno.land/x/oak/mod.ts";
import { Client } from "https://deno.land/x/mysql/mod.ts";

const client = new Client();
client.connect({
  hostname: "www.tomtalk.net",
  username: "root",
  password: "tec007DB",
  db: "tomtalk",
});

const app = new Application();
const router = new Router();

router
  .get("/", (ctx) => {
    ctx.response.body = "Hello World Welcome......";
  })
  .get("/projects", async (ctx) => {
    const data = await client.query(`SELECT * FROM todo_projects`);

    ctx.response.body = {
      success: true,
      data,
    };
  })
  .get("/items", async (ctx: RouterContext) => {
    console.log(ctx.request);
    console.log(ctx.params);

    const data = await client.query(`SELECT * FROM todo_lists limit 0 , 5`);

    ctx.response.body = {
      success: true,
      data,
    };
  });

app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ hostname: "127.0.0.1", port: 4000 });
