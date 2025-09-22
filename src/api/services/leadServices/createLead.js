import { Lead } from "../../../models/index.js";

export default async function createLead(data) {
  try {
    const lead = await Lead.create(data);
    return lead;
  } catch (error) {
    throw error; 
  }
}
