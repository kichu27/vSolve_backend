import { Lead } from "../../../models/index.js";

export default async function leadExists(email) {
  try {
    const lead = await Lead.findOne({ email });
    return {
      exists: !!lead,
      data: lead || null
    };
  } catch (error) {
    throw error;
  }
}
