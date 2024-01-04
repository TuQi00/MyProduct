import express from "express"
import { createAccessToken } from "../helpers/token.js";
//import {validateToken} from "../controllers/validation/token.js";
//import  {createAccessToken}  from "../controllers/validation/token.js";
const router = express.Router(); 

router.get("/refreshToken", createAccessToken);


export default router
