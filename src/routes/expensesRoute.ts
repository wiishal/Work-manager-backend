import { Hono } from "hono";
import {
  AddNewCard,
  AddNewExpense,
  getAllExpenses,
} from "../services/expensesService";
import {} from "../validation/tasks";
import { calculateSpendAssistance } from "../services/aiService";
import {
  AddExpenseInput,
  AddNewCardInput,
  calculateSpendAssistanceAiResponse,
  CalculateSpendInputs,
} from "../validation/expenses";

const expensesRoute = new Hono<{
  Bindings: {
    PRISMA_ACCELERATE_URL: string;
    JWT_SECRET: string;
  };
}>();



expensesRoute.get("/", async (c) => {
  const userId = c.get("userId");
  const res = await getAllExpenses(c, userId);
  if (!res) {
    c.status(403);
    return c.json({ message: "failed during fetching task" });
  }
  c.status(200);
  return c.json({ expensesCards: res.expensesCards });
});



expensesRoute.post("/addCard", async (c) => {
  const userId = c.get("userId");
  const body = await c.req.json();
  console.log(body);
  const { success } = AddNewCardInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({ message: "invalide inputs" });
  }
  const res = await AddNewCard(c, userId, body.title);

  if (!res) {
    c.status(401);
    return c.json({ message: "failed to add card" });
  }
  c.status(200);
  return c.json({ message: "card added" });
});



// addSpend

expensesRoute.post("/addExpense", async (c) => {
  const userId = c.get("userId");
  const body = await c.req.json();
  console.log(body);
  const { success } = AddExpenseInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({ message: "invalide inputs" });
  }
  const res = await AddNewExpense(c, userId, body.spend, body.expenseCardId);

  if (!res) {
    c.status(401);
    return c.json({ message: "failed to add spend" });
  }
  c.status(200);
  return c.json({ message: "spend added" });
});





expensesRoute.post("/calculateSpendAssistance", async (c) => {
  const body = await c.req.json();
  const { success } = CalculateSpendInputs.safeParse(body);

  if (!success) {
    c.status(411);
    return c.json({ message: "invalide inputs" });
  }

  const filter = body.spends.map((s: { details: any }) => s.details);

  const response = await calculateSpendAssistance(c, filter);

  if (!response) {
    c.status(404);
    return c.json({ message: "failed to assist" });
  }

  const { success: isSafeParsed } =
    calculateSpendAssistanceAiResponse.safeParse(response);

  if (!isSafeParsed) {
    c.status(411);
    return c.json({ message: "failed  to assist" });
  }


  c.status(200);
  return c.json({ message: "spend reached", aiResponse: response });
});


export default expensesRoute;

