import { Request, Response } from "express";
import { Transaction } from "../models/transactions.model";
import { User } from "../models/user.model"; // Assuming you have user associations
import { TransactionService } from "../services/transaction.service";

// Create a transaction
export const createTransaction = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { amount, type } = req.body;
  const userId = (req as any).user.id;

  try {
    const transaction = await TransactionService.createTransaction(
      userId,
      amount,
      type
    );
    return res
      .status(201)
      .json({ message: "Transaction created successfully", transaction });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error creating transaction", error });
  }
};

// Fetch all transactions for the user
export const getTransactions = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const userId = (req as any).user.id;

    const transactions = await Transaction.findAll({
      where: { userId },
    });

    return res.status(200).json(transactions);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching transactions", error });
  }
};
