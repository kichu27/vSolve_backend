export default async function computeScoreForPhone(phone) {
    try {
        let score = 0;
        
        if (isValidE164Phone(phone)) {
            score += 1;
        }

        return score;

    } catch (error) {
        throw error;
    }
}

function isValidE164Phone(phone) {
    // Basic E.164 validation: optional + followed by 8-15 digits
    return /^\+?[1-9]\d{7,14}$/.test(phone?.replace(/\s/g, ''));
}
