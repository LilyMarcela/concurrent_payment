import { Request, Response } from "express";
import { User } from "../models/user.model";
import { OptimisticLockError } from "sequelize";

export const updateUserProfile = async (
  req: Request,
  res: Response
): Promise<User | any> => {
  const { userId } = req.params;

  const { email, username, role } = req.body;

  try {
    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
      return res.status(400).json({ message: "user Not Found" });
    }
    user.email = email;
    user.username = username;
    user.role = role;

    await user.save();

    return user;
  } catch (error) {
    if (error instanceof OptimisticLockError) {
      return res
        .status(409)
        .json({ message: "Data has been modified, please try again" });
    }

    return res.status(500).json({ message: "Error updating", error });
  }
};
