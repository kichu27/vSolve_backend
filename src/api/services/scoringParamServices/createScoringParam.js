import { ScoringParam } from "../../../models/index.js";

export default async function createScoringParam(data) {
  try {
    const param = await ScoringParam.create(data);
    return param;
  } catch (error) {
    throw error; 
  }
}
