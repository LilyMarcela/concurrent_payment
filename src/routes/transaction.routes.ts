import { Router } from "express";
import {
  createTransaction,
  getTransactions,
} from "../controllers/transaction.controller";
import { authenticateJWT } from "../middleware/auth.middleware"; // middleware

const router = Router();

// Create a new transaction (protected)
router.post("/transactions", authenticateJWT, createTransaction);

// Get all transactions for the user (protected)
router.get("/transactions", authenticateJWT, getTransactions);

export default router;
