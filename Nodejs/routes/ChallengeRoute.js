import express from "express"
import {validateToken} from "../helpers/token.js";
import {searchChallenge, detailChallenge, viewChallenge } from "../controllers/ChallengeController.js";
// import detailChallenge  from "../controllers/ChallengeController.js";
const router = express.Router();

router.get("/results", validateToken, viewChallenge);
router.get("/:id", validateToken, detailChallenge);
router.get("/", validateToken, searchChallenge);


export default router
