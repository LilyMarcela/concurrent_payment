import { sequelize } from "../../config/database";
import { User } from "../models/user.model";
import { Transaction } from "../models/transactions.model";
import { Transaction as Db_transaction } from "sequelize";
export class TransactionService {
  static async createTransaction(userId: string, amount: number, type: string) {
    return await Transaction.create({ userId, amount, type });
  }

  static async getTransactions(userId: string) {
    return await Transaction.findAll({ where: { userId } });
  }

  public async processTransaction(
    payerId: string,
    payeeId: string,
    amount: number
  ) {
    let transaction: Transaction | any;

    try {
      transaction = await sequelize.transaction({
        isolationLevel: Db_transaction.ISOLATION_LEVELS.SERIALIZABLE,
      });
      const payer = await User.findOne({
        where: { id: payerId },
        lock: transaction.LOCK.UPDATE, // pesimistic locking
        transaction,
      });

      if (!payer || payer.balance < amount) {
        throw new Error("Insuficcient Balance");
      }

      payer.balance -= amount;
      await payer.save({ transaction });

      // lock and process the payee

      const payee = await User.findOne({
        where: { id: payeeId },
        lock: transaction.LOCK.UPDATE,
        transaction,
      });

      if (!payee) {
        throw new Error("Payee not found");
      }

      payee.balance += amount;
      await payee.save({ transaction });

      // commit transaction

      await transaction.commit;
      return { success: true, message: "transaction successful" };
    } catch (error) {
      if (transaction) {
        await transaction.rollback();
      }
      throw error;
    }
  }
}
