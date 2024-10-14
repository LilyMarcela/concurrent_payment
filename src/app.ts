import dotenv from "dotenv";
import express from "express";
import authRoutes from "./routes/auth.routes";
import transactionRoutes from "./routes/transaction.routes";
import userRoutes from "./routes/user.routes";

dotenv.config();

console.log("JWT_SECRET:", process.env.JWT_SECRET);

const app = express();
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api", transactionRoutes);
app.use("/api", userRoutes);

app.get("/", (req, res) => {
  res.send("Payment processor Api");
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
