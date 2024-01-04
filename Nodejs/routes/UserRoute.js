import express from "express"
import {validateToken} from "../helpers/token.js";
import { signin, changepassword,  } from "../controllers/UserControllers.js"
const router = express.Router();


router.post("/signin", signin);
router.post("/changepassword",validateToken, changepassword);


export default router
