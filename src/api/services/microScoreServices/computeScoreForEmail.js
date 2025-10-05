export default async function computeScoreForEmail(email) {
    try {
        
        let score = 0;
        
        const domain = email.split('@')[1]?.toLowerCase();
       
        let isDisposableEmail = isDisposableEmailDomain(domain)
        
        const govAcademicDomains = ['.gov', '.ac', '.edu', '.mil'];
        if (govAcademicDomains.some(ext => domain.includes(ext))) {
            score += 3;
        }
        else if (!isFreeEmailDomain(domain)) {
            score += 2;
        }
        
        return {score , isDisposableEmail};

    } catch (error) {
        throw error;
    }
}

function isFreeEmailDomain(domain) {
    const freeDomains = [
        'gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 
        'aol.com', 'icloud.com', 'protonmail.com', 'zoho.com',
        'yandex.com', 'mail.com', 'gmx.com'
    ];
    return freeDomains.includes(domain);
}

function isDisposableEmailDomain(domain) {
    const disposableDomains = [
        // Popular Temporary Email Services
        'tempmail.com', 'temp-mail.org', 'temp-mail.io', 'temp-mail.com',
        'guerrillamail.com', 'guerrillamail.net', 'guerrillamail.org',
        'mailinator.com', 'mailinator.net', 'mailinator.org',
        '10minutemail.com', '10minutemail.net',
        'throwawaymail.com', 'throwawayemail.com',
        'fakeinbox.com', 'fake-mail.com',
        'yopmail.com', 'yopmail.net',
        'getairmail.com', 'airmail.com',
        'sharklasers.com', 'grr.la',
        'spamgourmet.com', 'spam4.me',
        
        // Other Disposable Services
        'dispostable.com', 'trashmail.com',
        'mohmal.com', 'mintemail.com',
        'emailondeck.com', 'anonbox.net',
        'jetable.org', 'maildrop.cc',
        'tmpmail.org', 'tempinbox.com',
        'deadaddress.com', 'getnada.com',
        'tempail.com', 'linshi-email.com',
        
        // Newer Services
        'tempmailo.com', 'tmpmail.net',
        'mail.tm', 'quickmail.com',
        'tempr.email', 'email-temp.com',
        
        // Pattern-based domains (catch-all)
        /^mailinator\.+/,
        /^temp-?mail\.+/,
        /^throwaway\.+/,
        /^fake-?mail\.+/,
        /^disposable\.+/,
        /^tmp-?mail\.+/
    ];

    const domainLower = domain.toLowerCase();
    
    return disposableDomains.some(disposable => {
        if (typeof disposable === 'string') {
            return domainLower === disposable;
        } else if (disposable instanceof RegExp) {
            return disposable.test(domainLower);
        }
        return false;
    });
}