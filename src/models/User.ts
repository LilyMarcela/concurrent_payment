import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../config/database";
import { v4 as uuidv4 } from "uuid";

export class User extends Model {
  public id!: string;
  public username!: string;
  public password_hash!: string;
  public role!: string;
}

//DEfine model

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password_hash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "user",
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
    timestamps: true,
  }
);
