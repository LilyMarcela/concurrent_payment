import { Transaction } from "../models/transactions.model";

export class TransactionService {
  static async createTransaction(userId: string, amount: number, type: string) {
    return await Transaction.create({ userId, amount, type });
  }

  static async getTransactions(userId: string) {
    return await Transaction.findAll({ where: { userId } });
  }
}
