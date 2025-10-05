import { ScoringParam } from "../../../models/index.js";

export default async function computeScoreForLegacy(legacyRole) {
    try {

        let object = await ScoringParam.findOne({category : "legacy_role" , parameterName : legacyRole})
        return object.weightage ;

    } catch (error) {
        throw error;
    }
}
