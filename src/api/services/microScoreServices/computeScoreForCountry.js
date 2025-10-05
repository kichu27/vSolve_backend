export default async function computeScoreForCountry(country, userIP) {
    try {
        let score = 0;
        let geo_mismatch = false;
        
        const priorityCountries = ['india', 'uae', 'saudi arabia', 'ksa', 'qatar', 'oman', 'kuwait', 'bahrain', 'kenya', 'nigeria', 'south africa'];
        
        if (country && priorityCountries.includes(country.toLowerCase())) {
            score += 2;
        } else if (country) {
            score += 1; // Any other country gets 1 point
        }
        // No country selected = 0 points
        
        // Check for GEO_MISMATCH if IP is provided
        if (userIP && country) {
            geo_mismatch = await checkGeoMismatch(userIP, country);
        }


        return {
            score: score,
            geo_mismatch: geo_mismatch
        };

    } catch (error) {
        throw error;
    }
}

// GEO_MISMATCH helper function
async function checkGeoMismatch(userIP, selectedCountry) {
    try {
        // Using ip-api.com free service
        const response = await fetch(`http://ip-api.com/json/${userIP}?fields=country`);
        const data = await response.json();
        const ipCountry = data.country;
        
        if (!ipCountry) return false;
        
        // Normalize country names for comparison
        const normalizeCountry = (country) => {
            const countryMap = {
                'united states': 'usa',
                'united states of america': 'usa',
                'us': 'usa',
                'uae': 'united arab emirates',
                'ksa': 'saudi arabia',
                'uk': 'united kingdom',
                'in': 'india',
                'ae': 'united arab emirates',
                'sa': 'saudi arabia'
            };
            
            let normalized = country.toLowerCase().trim();
            return countryMap[normalized] || normalized;
        };
        
        const ipCountryNormalized = normalizeCountry(ipCountry);
        const selectedCountryNormalized = normalizeCountry(selectedCountry);
        
        return ipCountryNormalized !== selectedCountryNormalized;
        
    } catch (error) {
        console.error('GeoIP lookup failed:', error);
        return false;
    }
}