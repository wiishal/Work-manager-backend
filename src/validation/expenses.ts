import z from "zod";
import { number } from "zod/v4";
export const CalculateSpendInputs = z.object({
  spends: z.array(
    z.object({
      id: z.number(),
      details: z.string(),
      expenseCardId: z.number(),
      createdAt: z.string(),
    })
  ),
});

export const AddNewCardInput = z.object({
  title: z.string().max(20).min(1),
});

export const AddExpenseInput = z.object({
  spend: z.string().min(1).max(50),
  expenseCardId: z.number(),
});

export const calculateSpendAssistanceAiResponse = z.object({
  result: z.number(),
});
