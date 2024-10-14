import { Request, Response } from "express";
import { UserService } from "../services/user.service";

export const register = async (req: Request, res: Response): Promise<any> => {
  try {
    const { username, email, password } = req.body;
    const user = await UserService.register({ username, email, password });

    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Registration failed", error });
  }
};

export const login = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password } = req.body;
    const user = await UserService.findByEmail(email);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await UserService.comparePasswords(
      password,
      user.password_hash
    );
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = UserService.generateToken(user);
    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ message: "Login failed", error });
  }
};
