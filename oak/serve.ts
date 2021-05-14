import {
  Application,
  Router,
  helpers,
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
  .get("/categories", async (ctx) => {
    const data = await client.query(`SELECT * FROM todo_categories`);
    ctx.response.body = {
      success: true,
      data,
    };
  })
  .post("/categories", async (ctx) => {
    // 获取body参数方法
    const params = await ctx.request.body().value;

    const opRes = await client.query(
      `INSERT INTO todo_categories (name, parent) values(?, 0)`,
      [params.name]
    );

    ctx.response.body = {
      success: true,
      params,
      opRes,
      //ctx,
      //data,
    };
  })
  .get("/projects", async (ctx) => {
    const data = await client.query(
      `SELECT * FROM todo_projects where user_id=1`
    );
    ctx.response.body = {
      success: true,
      data,
    };
  })
  .get("/projects/:id", async (ctx) => {
    const params = helpers.getQuery(ctx, { mergeParams: true });
    const data = await client.query(`SELECT * FROM todo_projects where id=?`, [
      params.id,
    ]);
    ctx.response.body = {
      success: true,
      data,
    };
  })
  .delete("/projects/:id", async (ctx) => {
    const params = helpers.getQuery(ctx, { mergeParams: true });
    const data = await client.query(`DELETE FROM todo_projects where id=?`, [
      params.id,
    ]);
    ctx.response.body = {
      success: true,
      data,
    };
  })
  .post("/projects", async (ctx) => {
    // 获取body参数方法
    const params = await ctx.request.body().value;

    const opRes = await client.query(
      `INSERT INTO todo_projects (name, user_id) values(?, 1)`,
      [params.name]
    );

    ctx.response.body = {
      success: true,
      params,
      opRes,
      //ctx,
      //data,
    };
  })
  .put("/projects", async (ctx) => {
    // 获取body参数方法
    const params = await ctx.request.body().value;

    // desc作为字段名，使用时表要加别我，否则报错；
    // query()方法，也可以改用execute()
    const opRes = await client.query(
      `UPDATE todo_projects as e SET name = ?, e.desc = ? WHERE id = ?`,
      [params.name, params.desc, params.id]
    );

    ctx.response.body = {
      success: true,
      params,
      opRes,
      //ctx,
      //data,
    };
  })
  .get("/items", async (ctx) => {
    // 获取参数方法：1
    const params = helpers.getQuery(ctx, { mergeParams: true });

    // 获取参数方法：2
    const start = ctx.request.url.searchParams.get("start");
    const end = ctx.request.url.searchParams.get("end");

    // 取数据
    const sql = `SELECT * FROM todo_lists where start_time >= ${start} and start_time <= ${end} order by start_time asc limit 0 , 99`;
    const data = await client.query(sql);

    // 取记录总数
    const sqlTotal = `SELECT count(*) as total FROM todo_lists where start_time >= ${start} and start_time <= ${end}`;
    const totalResult = await client.query(sqlTotal);

    ctx.response.body = {
      success: true,
      total: totalResult[0].total,
      params,
      sql,
      data,
    };
  })
  .get("/items/search", async (ctx: RouterContext) => {
    const keyword = ctx.request.url.searchParams.get("keyword");

    // 取数据
    const sql = `SELECT * FROM todo_lists where job_name like '%${keyword}%' order by start_time desc limit 0 , 20`;
    const data = await client.query(sql);

    // 取记录总数
    const sqlTotal = `SELECT count(*) as total FROM todo_lists where job_name like '%${keyword}%'`;
    const totalResult = await client.query(sqlTotal);

    ctx.response.body = {
      success: true,
      total: totalResult[0].total,
      params: {
        keyword,
      },
      sql,
      data,
    };
  });

app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ hostname: "127.0.0.1", port: 4000 });
