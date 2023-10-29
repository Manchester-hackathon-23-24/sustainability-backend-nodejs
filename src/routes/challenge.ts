import { createChallenge, getAllAcceptedChallenges, acceptChallenge, denyChallenge, getAllPendingChallenges } from "../controllers/challenge";
import { Router } from "express";
import { verifyRolesMiddleware } from "../middleware/verifyRolesMiddleware";
const router = Router();

router.post("/", createChallenge);
router.get("/", getAllAcceptedChallenges);
router.get("/pending", verifyRolesMiddleware(["ADMIN"]), getAllPendingChallenges);
router.patch("/:id/accept", verifyRolesMiddleware(["ADMIN"]), acceptChallenge);
router.delete("/:id", verifyRolesMiddleware(["ADMIN"]), denyChallenge);

export default router;