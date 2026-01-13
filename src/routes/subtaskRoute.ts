import { Hono } from "hono";
import {
  addSubTask,
  deleteSubTask,
  getSubtasks,
  tooggleSubTask,
} from "../services/subtaskServices";
import {
  subtaskAssistanceAiResponse,
  subtaskInputs,
  taskDetailsInputs,
} from "../validation/subtasks";
import { subTaskAssistance } from "../services/aiService";

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

subtaskRoute.post("/toggleSubtask", async (c) => {
  console.log('toogle task req')
  const body = await c.req.json();
  console.log(body)
  const updatedsubTask = await tooggleSubTask(c, body.id);
  if (!updatedsubTask) {
    c.status(404);
    return c.json({ message: "task not found" });
  }
  c.status(200);
  return c.json({
    message: "status change successfully",
    completeStatus: updatedsubTask.complete,
  });
});

subtaskRoute.delete("/deleteSubTask/:id", async (c) => {
  console.log("id");
  const id = c.req.param("id");
  const currId = Number(id);
  console.log(currId);
  const res = await deleteSubTask(c, currId);
  if (!res) {
    c.status(403);
    return c.json({ message: "error while deleting" });
  }

  c.status(200);
  return c.json({ message: "subtask deleted successfully" });
});

subtaskRoute.post("/assistance", async (c) => {
  const body = await c.req.json();
  console.log(body);
  const { success } = taskDetailsInputs.safeParse(body);

  if (!success) {
    c.status(403);
    return c.json({ message: "error while assistance" });
  }
  const response = await subTaskAssistance(c, body.taskDetails);
  if (!response) {
    c.status(403);
    return c.json({ message: "error while assistance" });
  }
  const { success: isSafeParsed } =
    subtaskAssistanceAiResponse.safeParse(response);

  if (!isSafeParsed) {
    c.status(403);
    return c.json({ message: "error while assistance" });
  }
  c.status(200);
  return c.json({ subtasks: response });
});
export default subtaskRoute;
