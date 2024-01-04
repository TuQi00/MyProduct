import express from "express"
import searchQuestion from "../controllers/QuestionController.js"
import {validateToken} from "../helpers/token.js";
const router = express.Router();

router.get("/", validateToken, searchQuestion);
    

export default router
