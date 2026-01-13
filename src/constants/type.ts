import { ExpenseCard, Expenses } from "@prisma/client";

export interface userCredentials {
  username: string;
  password: string;
}

export interface DecodedToken {
  role: string;
  user: string;
  userId: number;
}

export interface taskInput {
  title: string;
  taskDescription: string;
  date: string;
  complete: boolean;
  list: string[];
  tags: string[];
}

export interface subtaskConstant {
  id: number;
  taskId: number;
  detail: string;
  complete: boolean;
}
export interface tasksConstant extends taskInput {
  userId: number;
}
export interface tasksDBConstant extends tasksConstant {
  id: number;
}
export interface GetAllExpensesConstant {
  expensesCards: ExpenseCard[];
}

export interface AddNewCardConstant {
  newCard: ExpenseCard;
}
export interface AddNewExpenseConstant {
  newSpend: Expenses;
}

export interface userCredentials {
  username: string;
  password: string;
}

export interface TaskDetails {
  title: string;
  description: string;
}
