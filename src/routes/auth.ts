import { login, register, getAllUsers, logout } from "../controllers/auth";
import { Router } from "express";

const router = Router();
router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/users", getAllUsers);

export default router;