import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  Default,
  ForeignKey,
  BelongsTo,
  CreatedAt,
  UpdatedAt,
  BeforeCreate,
} from "sequelize-typescript";
import { User } from "./user.model"; // Assuming you have a User model

// Define the attributes needed for creating a Transaction
interface TransactionCreationAttributes {
  amount: number;
  type: string;
  userId: string; // Foreign key to the User model
}

@Table({
  tableName: "transactions",
})
export class Transaction extends Model<
  Transaction,
  TransactionCreationAttributes
> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  amount!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  type!: string; // Could be 'credit' or 'debit'

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  userId!: string;

  @BelongsTo(() => User)
  user!: User;

  @CreatedAt
  @Column(DataType.DATE)
  createdAt!: Date;

  @UpdatedAt
  @Column(DataType.DATE)
  updatedAt!: Date;

  // Define a custom validation using a hook
  @BeforeCreate
  static validateTransaction(transaction: Transaction) {
    if (transaction.amount <= 0) {
      throw new Error("Amount must be greater than 0");
    }
    if (!["credit", "debit"].includes(transaction.type)) {
      throw new Error("Transaction type must be either credit or debit");
    }
  }
}
