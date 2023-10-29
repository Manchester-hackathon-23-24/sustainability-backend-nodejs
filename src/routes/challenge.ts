import { createChallenge, getAllAcceptedChallenges, acceptChallenge, denyChallenge, getAllPendingChallenges } from "../controllers/challenge";
import { Router } from "express";
const router = Router();

router.post("/", createChallenge);
router.get("/", getAllAcceptedChallenges);
router.get("/pending", getAllPendingChallenges);
router.patch("/:id/accept", acceptChallenge);
router.delete("/:id", denyChallenge);

export default router;