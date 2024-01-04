import express from "express"
import {validateToken} from "../helpers/token.js";
import {searchAssginment, detailAssginment, viewAssginment } from "../controllers/AssginmentController.js";
// import detailAssginment  from "../controllers/AssginmentController.js";
const router = express.Router();

router.get("/results", validateToken, viewAssginment);
router.get("/:id", validateToken, detailAssginment);
router.get("/", validateToken, searchAssginment);


export default router
