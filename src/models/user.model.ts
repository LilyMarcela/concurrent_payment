import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  Default,
  CreatedAt,
  UpdatedAt,
} from "sequelize-typescript";

interface UserCreationAttributes {
  username: string;
  email: string;
  password_hash: string;
}

@Table({
  tableName: "users",
  version: true, // optimistic locking
})
export class User extends Model<User, UserCreationAttributes> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: string;

  @Column(DataType.STRING)
  username!: string;

  @Column(DataType.STRING)
  email!: string;

  @Column(DataType.STRING)
  password_hash!: string;

  @Column(DataType.STRING)
  role!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0, // Default version is 0
  })
  version!: number;
}
