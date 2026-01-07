import { Context } from "hono";
import { getPrisma } from "../config/prismaClient";
import { AddNewCardConstant, AddNewExpenseConstant, GetAllExpensesConstant } from "../constants/type";
import { ExpenseCard } from "@prisma/client";

export async function getAllExpenses(
  c: Context,
  user: number
): Promise<GetAllExpensesConstant | false> {
  const prisma = getPrisma(c.env.PRISMA_ACCELERATE_URL);
  try {
    const expensesCards = await prisma.expenseCard.findMany({
      where: {
        userId: user,
      },
      include: {
        expenses: true,
      },
    });

    return { expensesCards: expensesCards };
  } catch (error) {
    return false;
  }
}

export async function AddNewCard(
  c: Context,
  userId: number,
  cardTitle: string
): Promise<AddNewCardConstant | false> {
  const prisma = getPrisma(c.env.PRISMA_ACCELERATE_URL);
  try {
    const newCard = await prisma.expenseCard.create({
      data: {
        name: cardTitle,
        userId: userId,
      },
    });
    console.log("card : ", newCard);
    return { newCard: newCard };
  } catch (error) {
    return false;
  }
}


export async function AddNewExpense(
  c: Context,
  userId: number,
  spend: string,
  expenseCardId:number
): Promise<AddNewExpenseConstant | false> {
  const prisma = getPrisma(c.env.PRISMA_ACCELERATE_URL);
  try {
    const newSpend = await prisma.expenses.create({
      data:{
        expenseCardId:expenseCardId,
        details:spend
      }
    })
    return { newSpend: newSpend };
  } catch (error) {
    return false;
  }
}


