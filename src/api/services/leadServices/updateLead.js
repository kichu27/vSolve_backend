import { Lead } from "../../../models/index.js";


export default async function updateLead(data) {
  try {

    const updateFields = {};
    if (data.status) updateFields.status = data.status;
    if (data.email) updateFields.email = data.email.toLowerCase();
    if (data.name) updateFields.name = data.name.toLowerCase();

    updateFields.updatedBy = data.updatedBy || "68d15bdbec53bbea36106a7e" ;

    const updatedLead = await Lead.findByIdAndUpdate(
      data._id,
      updateFields,
      { new: true } 
    );


    if (!updatedLead) {
      throw new Error("Lead not found");
    }


    return updatedLead;
  } catch (error) {
    throw error;
  }
}
