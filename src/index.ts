import { Hono } from "hono";
import { cors } from "hono/cors";
import authRoute from "./routes/authRoute";
import taskRoute from "./routes/taskRoute";
import { tokenVerify } from "./middleware/tokenVerification";
import userStr from "./routes/userStrRoute";
import expensesRoute from "./routes/expensesRoute";
import subtaskRoute from "./routes/subtaskRoute";

const app = new Hono<{
  Bindings: {
    PRISMA_ACCELERATE_URL: string;
    JWT_SECRET: string;
  };
}>();

app.use(
  "/api/*",
  cors({
    origin: ["http://localhost:5173", "https://work-manager-vn27.vercel.app"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.get("/", (c) => c.json({ health: "ok" }));

app.use("/api/v1/task/*", tokenVerify);
app.use("/api/v1/subtask/*", tokenVerify);
app.use("/api/v1/userStr/*", tokenVerify);
app.use("/api/v1/expenses/*", tokenVerify);

app.route("/api/v1/auth", authRoute);
app.route("/api/v1/task", taskRoute);
app.route("/api/v1/subtask", subtaskRoute);
app.route("/api/v1/userStr", userStr);
app.route("/api/v1/expenses", expensesRoute);
export default app;
