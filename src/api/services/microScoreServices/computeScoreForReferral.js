import { ScoringParam } from "../../../models/index.js";

export default async function computeScoreForReferral(referralSource) {
  try {
    let flag = {};
    let score = 0;

    const object = await ScoringParam.findOne({
      category: "referral_source",
      parameterName: referralSource,
      isActive: true,
    }).lean();

    if (object) {
      flag.thin_referral_note = false;
      score = object.weightage || 0;
    } else {
      if (referralSource && referralSource.length < 6) {
        flag.thin_referral_note = true;
      } else {
        flag.thin_referral_note = false;
      }
      score = 2;
    }

    return { score, flag };
  } catch (error) {
    throw error;
  }
}
