import { Hono } from "hono";
import router from "./routes/web";
import { serveStatic } from "hono/bun";

const app = new Hono();

// 1. Middleware Global (Harus di paling atas agar semua rute kebagian)
app.use("*", async (c, next) => {
  c.set("currentPath", c.req.path);
  await next();
});

// 2. Static file (CSS)
app.use("/css/*", serveStatic({ root: "./src/public" }));

// 3. Routes (Daftar pintu utama aplikasi)
app.route("/", router);

export default {
  port: 3000,
  fetch: app.fetch,
};