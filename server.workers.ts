import { Hono } from "hono";
import { serveStatic } from "hono/cloudflare-workers";
import app from "./server";
import { showRoutes } from "hono/dev";

const workersApp = new Hono();

workersApp.get(
  "/build/*",
  serveStatic({
    root: "./",
  })
);

workersApp.route("/", app);
showRoutes(workersApp);

export default workersApp;
