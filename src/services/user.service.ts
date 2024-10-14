import { User } from "../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class UserService {
  public static async findByEmail(email: string): Promise<User | null> {
    return await User.findOne({ where: { email } });
  }

  public static async comparePasswords(
    plainPassword: string,
    hashedPassword: string
  ): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  public static generateToken(user: User): string {
    const jwtSecret = process.env.JWT_SECRET as string;
    return jwt.sign(
      { id: user.id, role: user.role }, // Payload containing user id and role
      jwtSecret, // Secret key
      { expiresIn: "1h" } // Token expires in 1 hour
    );
  }

  public static async register(userData: {
    username: string;
    email: string;
    password: string;
  }): Promise<User> {
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const user = await User.create({
      username: userData.username,
      email: userData.username,
      password_hash: hashedPassword,
    });
    return user;
  }
}
