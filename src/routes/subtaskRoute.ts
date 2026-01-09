import { Hono } from "hono";
import {
  addSubTask,
  deleteSubTask,
  getSubtasks,
  tooggleSubTask,
} from "../services/subtaskServices";
import { subtaskInputs } from "../validation/tasks";

const subtaskRoute = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

subtaskRoute.post("/", async (c) => {
  const body = await c.req.json();
  const subtasks = await getSubtasks(c, body.taskId);
  if (!subtasks) {
    c.status(404);
    return c.json({ message: "subtasks not found" });
  }
  c.status(200);
  return c.json({ message: "get subtask successfully", subtasks: subtasks });
});

subtaskRoute.post("/addSubTask", async (c) => {
  const body = await c.req.json();
  console.log(body);
  const { success } = subtaskInputs.safeParse(body.subTask);

  if (!success) {
    c.status(403);
    return c.json({ message: "invalide subtask" });
  }
  const createdSubtask = await addSubTask(c, body.subTask);
  if (!createdSubtask) {
    c.status(501);
    return c.json({ message: "Error during adding subtask" });
  }
  c.status(200);
  return c.json({
    message: "subtask added successfully",
    subtask: createdSubtask,
  });
});

subtaskRoute.get("/toggleSubtask", async (c) => {
  const body = await c.req.json();
  const updatedsubTask = await tooggleSubTask(c, body.id);
  if (!updatedsubTask) {
    c.status(404);
    return c.json({ message: "task not found" });
  }
  c.status(200);
  return c.json({
    message: "status change successfully",
    subtaskid: updatedsubTask.id,
  });
});

subtaskRoute.delete("/deleteSubTask/:id", async (c) => {
  const id = c.req.param("id");
  const currId = Number(id);
  const res = await deleteSubTask(c, currId);
  if (!res) {
    c.status(403);
    return c.json({ message: "error while deleting" });
  }

  c.status(400);
  return c.json({ message: "subtask deleted successfully" });
});

export default subtaskRoute;
