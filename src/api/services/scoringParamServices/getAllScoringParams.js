import { ScoringParam } from "../../../models/index.js";

export default async function getAllScoringParams(data) {
  try {
    const param = await ScoringParam.aggregate([
      {
        $match: {
          isActive: true
        }
      },
    
      {
        $group: {
          _id: "$category",
          dropdownOptions: { $push: "$parameterName" }
        }
      }
    ]);
    return param;
  } catch (error) {
    throw error; 
  }
}
