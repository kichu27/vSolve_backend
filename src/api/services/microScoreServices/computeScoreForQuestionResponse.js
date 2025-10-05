export default async function computeScoreForQuestionResponse(questionResponse, config) {
    try {
        let score = 0;
        let thin_reason = false;
        
        if (!questionResponse) {
            thin_reason = true;
            return { score, thin_reason };
        }
        
        const response = questionResponse.trim();
        
        // Check length requirement (20-400 chars)
        if (response.length >= 20 && response.length <= 400) {
            // Check for spam keywords/phrases
            if (!containsSpamPhrases(response, config?.spamKeywords)) {
                score += 2; // Good quality response
            } else {
                thin_reason = true; // Contains spam
            }
        } else {
            thin_reason = true; // Too short or too long
        }
        
        return {
            score: score,
            thin_reason: thin_reason
        };

    } catch (error) {
        throw error;
    }
}

// Helper function to check for spam phrases
function containsSpamPhrases(text, customSpamKeywords = []) {
    const defaultSpamKeywords = [
        'loan', 'crypto', 'casino', 'gambling', 'investment', 
        'money', 'profit', 'earn money', 'make money', 'get rich',
        'bitcoin', 'forex', 'trading', 'stock market', 'investment scheme',
        'quick money', 'fast cash', 'financial freedom', 'passive income',
        'business opportunity', 'work from home', 'online business'
    ];
    
    const spamKeywords = [...defaultSpamKeywords, ...customSpamKeywords];
    const lowerText = text.toLowerCase();
    
    return spamKeywords.some(keyword => lowerText.includes(keyword.toLowerCase()));
}