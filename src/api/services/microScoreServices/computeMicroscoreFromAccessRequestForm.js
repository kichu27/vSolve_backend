import computeScoreForEmail from "./computeScoreForEmail.js";
import computeScoreForCountry from "./computeScoreForCountry.js";
import computeScoreForPhone from "./computeScoreForPhone.js";
import computeScoreForQuestionResponse from "./computeScoreForQuestionResponse.js";
import computeScoreForLegacy from "./computeScoreForLegacy.js";
import computeScoreForlegacyRole from "./computeScoreForlegacyRole.js";
import computeScoreForReferral from "./computeScoreForReferral.js";

export default async function computeMicroscoreFromForm1(data) {
  try {

    let { score: emailScore, isDisposableEmail } = await computeScoreForEmail(data.email);
    let { score: countryScore, geo_mismatch } = await computeScoreForCountry(data.country, data.userIP);
    let phoneScore = await computeScoreForPhone(data.phone);
    let responseScore = await computeScoreForQuestionResponse(data.questionResponse);
    let legacyScore = await computeScoreForLegacy(data.legacyScale);
    let legacyRoleScore = await computeScoreForlegacyRole(data.legacyRole);
    let referralScore = await computeScoreForReferral(data.referralSource);
    
    const totalScore = emailScore + countryScore + phoneScore + legacyScore + legacyRoleScore + referralScore.score + responseScore.score;

    return {

      score: totalScore,

      flags: {
        risk_email_disposable: isDisposableEmail,
        geo_mismatch: geo_mismatch,
        thin_reason : responseScore.thin_reason ,
        thin_referral_note : referralScore.flag.thin_referral_note,
      },

      breakdown: {
        email: emailScore,
        country: countryScore,
        phone: phoneScore,
        response: responseScore.score,
        legacy: legacyScore ,
        role : legacyRoleScore ,
        referral : referralScore.score
      }
      
    };

  } catch (error) {
    throw error;
  }
}