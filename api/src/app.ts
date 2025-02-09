import { Hono } from "hono";
import postsRoute from "./routes/posts";
import { HTTPException } from "hono/http-exception";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.route("/", postsRoute);

app.onError((err, c) => {
  console.log(err);

  if (err instanceof HTTPException) {
    // I know this is one of those HTTPException I have thrown
    return c.json({
      error: err.message
    }, err.status);
  }

  return c.json({ error: "An unexpected error happened!" }, 500);
})

export default app;
