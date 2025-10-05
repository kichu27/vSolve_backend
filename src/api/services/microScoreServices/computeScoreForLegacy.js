import { ScoringParam } from "../../../models/index.js";

export default async function computeScoreForLegacy(legacyScale) {
    try {

        let object = await ScoringParam.findOne({category : "legacy_scale" , parameterName : legacyScale})
        return object.weightage ;

    } catch (error) {
        throw error;
    }
}
