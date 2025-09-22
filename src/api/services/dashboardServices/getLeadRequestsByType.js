import { Lead } from "../../../models/index.js";

export default async function getLeadRequestsByType(type) {
  try {
    let records = await Lead.find(
      { status: type },
      { _id: 1, name: 1, status: 1 }
    ).sort({ createdAt: -1 });

    return records || [];
  } catch (error) {
    throw error;
  }
}
