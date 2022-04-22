import { useState } from "react";

export const useFetching = (callback) => {
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState('');

	const fetch = async (...args) => {
		try {
			setIsLoading(true);
			await callback(...args);
		}
		catch(e) {
			setError(e.message)
		}
		finally {
			setIsLoading(false);
		}
	}

	return [fetch, isLoading, error];
}