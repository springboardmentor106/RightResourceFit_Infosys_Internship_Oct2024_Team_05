export function extractUserAgentName(userAgent) {
	// Define regular expressions for matching common user agent names
	const regexPatterns = [
		/^(Mozilla|Opera|Safari|Chrome|Edge|Thunder Client|Postman|Insomnia|curl|wget|HTTPie|axios|Go-http-client|python-requests|Java|Apache-HttpClient|okhttp)/i,
		/^([a-zA-Z0-9\s]+)\//, // Matches custom user agent names before a slash
	];

	// Iterate over each regex pattern to find a match
	for (const regex of regexPatterns) {
		const match = userAgent.match(regex);
		if (match && match[1]) {
			return match[1].trim(); // Return the matched user agent name
		}
	}

	// Return 'Unknown' if no match is found
	return 'Unknown User-Agent';
}

export function generateRandomString(length) {
	const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
	let result = '';

	for (let i = 0; i < length; i++) {
		const randomIndex = Math.floor(Math.random() * characters.length);
		result += characters.charAt(randomIndex);
	}

	return result;
}