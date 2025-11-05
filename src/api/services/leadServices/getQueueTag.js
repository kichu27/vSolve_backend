export function getQueueTag(score) {
    const { score: totalScore, flags } = score;
  
    if (flags?.risk_email_disposable) return "review_strict";
    if (totalScore <= 3) return "review_strict";
    if (totalScore >= 4 && totalScore <= 6) return "review_light";
    if (!flags?.risk_email_disposable && totalScore >= 9) return "fast_track";
  
    return "review_light"; // default
  }
  