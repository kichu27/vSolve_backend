import { Lead } from "../../../models/index.js";

export default async function getLeadDataByEmail(email) {
  try {
    const lead = await Lead.findOne({ email });
    return lead ;

  } catch (error) {
    throw error;
  }
}
