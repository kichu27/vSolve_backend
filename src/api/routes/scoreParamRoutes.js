import { Router } from "express";
import {createScoreParam , getAllScoringParams} from "../controllers/scoringParamController/index.js";

const router = Router();

router.post("/createScoringParam", createScoreParam);
router.get("/getAllScoringParams", getAllScoringParams);
 



  
export default router;